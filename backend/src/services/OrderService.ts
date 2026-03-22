import { StatusEnum } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { WebSocketManager } from '../helpers/websocketManager';
import { prisma } from '../repository/prisma';
import { CreateOrderBody } from '../schemas/OrderSchemas';
import { OrderWithUserAndItems, PaginatedResponse } from '../types/Order';

export class OrderService {
  async getAllOrder(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const orders = await prisma.order.findMany({
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

    return orders;
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
              addresses: {
                where: { isDefault: true },
                take: 1,
              },
            },
          },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
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

  async getAllOrderForUser(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Pedido inválido!', 400);
    const orders = await prisma.order.findMany({
      where: { userId: id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                image: true,
                category: { select: { name: true } },
              },
            },
          },
        },
      },
    });

    return orders;
  }

  async getOrderById(id: string, userId: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Pedido inválido!', 400);

    const order = await prisma.order.findFirst({
      where: { id: id, userId: userId },
    });

    if (!order) throw new AppError('Pedido não encontrado!', 404);

    return order;
  }
  async createOrder(data: CreateOrderBody) {
    const address = await prisma.address.findFirst({
      where: {
        id: data.addressId,
        userId: data.userId,
      },
    });

    if (!address)
      throw new AppError(
        'Endereço de entrega não encontrado ou não pertence ao usuário!',
        404,
      );

    const newOrder = await prisma.$transaction(async tx => {
      const userExists = await tx.user.findUnique({
        where: { id: data.userId },
      });

      if (!userExists) throw new AppError('Usuário nao encontrado!', 404);

      const mergedItemsMap = new Map<string, number>();

      for (const item of data.items) {
        const currentQty = mergedItemsMap.get(item.productId) || 0;
        mergedItemsMap.set(item.productId, currentQty + item.quantity);
      }

      const sanitizedItems = Array.from(mergedItemsMap.entries()).map(
        ([productId, quantity]) => ({
          productId,
          quantity,
        }),
      );

      const products = await tx.product.findMany({
        where: {
          id: {
            in: sanitizedItems.map(item => item.productId),
          },
        },
      });

      const productMap = new Map(
        products.map(product => [product.id, product]),
      );

      const itemData = sanitizedItems.map(item => {
        const product = productMap.get(item.productId);

        if (!product) throw new AppError(`Produto nao encontrado!`, 404);

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

      const newOrder = await tx.order.create({
        data: {
          userId: data.userId,
          total,
          status: 'PENDENTE',
          items: {
            create: itemData,
          },
        },
        select: {
          id: true,
          userId: true,
          status: true,
          total: true,
          items: true,
          user: {
            select: {
              name: true,
              addresses: true,
            },
          },
        },
      });

      return newOrder;
    });
    WebSocketManager.notifyNewOrder('NEW_ORDER', newOrder);

    return newOrder;
  }

  async changeOrderStatus(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Pedido inválido!', 400);
    const order = await prisma.order.findFirst({
      where: { id: id },
    });

    if (!order) {
      throw new AppError('Pedido não encontrado', 404);
    }

    let nextStatus: StatusEnum;

    switch (order.status) {
      case 'PENDENTE':
        nextStatus = 'PREPARANDO';
        break;
      case 'PREPARANDO':
        nextStatus = 'SAIU_PARA_ENTREGA';
        break;
      case 'SAIU_PARA_ENTREGA':
        nextStatus = 'ENTREGUE';
        break;
      default:
        throw new AppError('Status não pode ser alterado', 400);
    }

    await prisma.order.update({
      where: { id: id },
      data: { status: nextStatus },
    });

    return;
  }

  async OrderCancel(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Pedido inválido!', 400);

    const result = await prisma.order.updateMany({
      where: {
        id: id,
        status: 'PENDENTE',
      },
      data: { status: 'CANCELADO' },
    });

    if (result.count === 0) throw new AppError('Erro ao cancelar pedido!', 404);

    WebSocketManager.notifyNewOrder('ORDER_CANCEL', {
      id: id,
      status: 'CANCELADO',
    });

    return;
  }
}
