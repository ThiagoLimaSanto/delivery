import { OrderTypeEnum } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';

interface Item {
  productId: string;
  quantity: number;
}

export class CommandService {
  async listCommand() {
    return prisma.command.findMany({
      select: {
        id: true,
        tableId: true,
        open: true,
        createdAt: true,

        orders: {
          select: {
            id: true,
            status: true,
            total: true,
            orderNumber: true,

            items: {
              select: {
                quantity: true,
                price: true,
                product: {
                  select: {
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async createCommand(tableId: string, items: Item[]) {
    const counter = await prisma.counter.upsert({
      where: { name: 'global_order_number' },
      update: { seq: { increment: 1 } },
      create: { name: 'global_order_number', seq: 1 },
    });
    const table = await prisma.table.findUnique({ where: { id: tableId } });
    if (!table) throw new AppError('Mesa inválida!');

    const existing = await prisma.command.findFirst({
      where: { tableId, open: true },
    });

    if (existing) {
      throw new AppError('Mesa já está ocupada');
    }

    let total = 0;

    const orderItems: any = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new AppError('Produto não encontrado');
      }

      const price = product.price;
      total += price * item.quantity;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price,
      });
    }
    return prisma.$transaction(async tx => {
      const command = await tx.command.create({
        data: { tableId },
      });

      const order = await tx.order.create({
        data: {
          command: {
            connect: { id: command.id },
          },
          typeOrder: OrderTypeEnum.LOCAL,
          orderNumber: counter.seq,
          status: 'PENDENTE',
          total: Number(total.toFixed(2)),
          items: {
            create: orderItems,
          },
        },
      });

      return { command, order };
    });
  }

  async addOrderToCommand(commandId: string, items: Item[]) {
    return prisma.$transaction(async tx => {
      const command = await tx.command.findUnique({
        where: { id: commandId },
      });

      if (!command) {
        throw new AppError('Comanda não existe!');
      }

      if (!command.open) {
        throw new AppError('Comanda fechada!');
      }

      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) throw new AppError('Produto não encontrado');

        const price = product.price;
        total += price * item.quantity;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price,
        });
      }

      total = Number(total.toFixed(2));

      const counter = await tx.counter.upsert({
        where: { name: 'global_order_number' },
        update: { seq: { increment: 1 } },
        create: { name: 'global_order_number', seq: 1 },
      });

      const order = await tx.order.create({
        data: {
          command: {
            connect: { id: command.id },
          },
          typeOrder: 'LOCAL',
          orderNumber: counter.seq,
          status: 'PENDENTE',
          total,
          items: {
            create: orderItems,
          },
        },
      });

      return order;
    });
  }

  async closeCommand(id: string) {
    const command = await prisma.command.findUnique({ where: { id } });
    if (!command) throw new AppError('Comanda nao encontrada!');
    if (command.open === false) throw new AppError('Comanda já está fechada!');
    return prisma.command.update({ where: { id }, data: { open: false } });
  }
}
