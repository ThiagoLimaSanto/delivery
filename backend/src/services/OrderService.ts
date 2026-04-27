import { OrderTypeEnum, StatusEnum } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { Server } from 'socket.io';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateOrderBody } from '../schemas/OrderSchemas';
import { OrderWithUserAndItems, PaginatedResponse } from '../types/Order';

type OrderEvent =
  | { action: 'order_created'; payload: any }
  | { action: 'order_updated'; payload: any }
  | { action: 'order_status_changed'; payload: any }
  | { action: 'order_cancelled'; payload: any };

export interface ServerToClientEvents {
  'order:update': (data: OrderEvent) => void;
}

export class OrderService {
  constructor(private readonly io: Server<any, ServerToClientEvents>) {}

  async getAllOrder(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    return prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            addresses: true,
          },
        },
      },
    });
  }

  async getOrderActive(userId: string) {
    return prisma.order.findFirst({
      where: {
        userId,
        status: {
          notIn: ['ENTREGUE', 'CANCELADO'],
        },
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true },
        },
        items: {
          include: {
            product: {
              select: { name: true, price: true },
            },
          },
        },
      },
    });
  }

  async listOrders(
    status?: StatusEnum,
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<OrderWithUserAndItems>> {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              phone: true,
              addresses: { where: { isDefault: true }, take: 1 },
            },
          },
          items: {
            include: {
              product: { select: { name: true, price: true } },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createOrder(data: CreateOrderBody) {
    const counter = await prisma.counter.upsert({
      where: { name: 'global_order_number' },
      update: { seq: { increment: 1 } },
      create: { name: 'global_order_number', seq: 1 },
    });

    const address = await prisma.address.findFirst({
      where: { id: data.addressId, userId: data.userId },
    });

    if (!address) {
      throw new AppError(
        'Endereço inválido ou não pertence ao usuário',
        404,
      );
    }

    const newOrder = await prisma.$transaction(async tx => {
      const userExists = await tx.user.findUnique({
        where: { id: data.userId },
      });

      if (!userExists) {
        throw new AppError('Usuário não encontrado', 404);
      }

      // 🔥 merge de itens
      const merged = new Map<string, number>();

      for (const item of data.items) {
        merged.set(
          item.productId,
          (merged.get(item.productId) || 0) + item.quantity,
        );
      }

      const sanitizedItems = Array.from(merged.entries()).map(
        ([productId, quantity]) => ({ productId, quantity }),
      );

      const products = await tx.product.findMany({
        where: {
          id: { in: sanitizedItems.map(i => i.productId) },
        },
      });

      const productMap = new Map(products.map(p => [p.id, p]));

      const itemData = sanitizedItems.map(item => {
        const product = productMap.get(item.productId);

        if (!product) {
          throw new AppError('Produto não encontrado', 404);
        }

        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const total = itemData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      return tx.order.create({
        data: {
          userId: data.userId,
          total: Number(total.toFixed(2)),
          typePayment: data.typePayment,
          orderNumber: counter.seq,
          typeOrder: OrderTypeEnum.DELIVERY,
          status: StatusEnum.PENDENTE,
          items: { create: itemData },
        },
      });
    });

    this.io.emit('order:update', {
      action: 'order_created',
      payload: newOrder,
    });

    return newOrder;
  }

  async changeOrderStatus(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Pedido inválido!', 400);
    }

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) throw new AppError('Pedido não encontrado', 404);

    let nextStatus: StatusEnum;

    switch (order.status) {
      case StatusEnum.PENDENTE:
        nextStatus = StatusEnum.PREPARANDO;
        break;
      case StatusEnum.PREPARANDO:
        nextStatus = StatusEnum.SAIU_PARA_ENTREGA;
        break;
      case StatusEnum.SAIU_PARA_ENTREGA:
        nextStatus = StatusEnum.ENTREGUE;
        break;
      default:
        throw new AppError('Status inválido para alteração', 400);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: nextStatus },
    });

    this.io.emit('order:update', {
      action: 'order_status_changed',
      payload: updated,
    });

    return updated;
  }

  async confirmOrder(id: string, userId: string) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Pedido inválido!', 400);
    }

    const order = await prisma.order.findFirst({
      where: { id, userId },
    });

    if (!order) throw new AppError('Pedido não encontrado', 404);

    if (order.status !== StatusEnum.SAIU_PARA_ENTREGA) {
      throw new AppError('Pedido não pode ser confirmado', 400);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: StatusEnum.ENTREGUE },
    });

    this.io.emit('order:update', {
      action: 'order_status_changed',
      payload: updated,
    });

    return updated;
  }

  async OrderCancel(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new AppError('Pedido inválido!', 400);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: StatusEnum.CANCELADO },
    });

    this.io.emit('order:update', {
      action: 'order_cancelled',
      payload: updated,
    });

    return updated;
  }
}