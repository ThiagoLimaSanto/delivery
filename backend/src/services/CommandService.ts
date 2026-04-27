import { OrderTypeEnum } from '@prisma/client';
import { Server } from 'socket.io';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { TableEvent } from './TableService';

interface Item {
  productId: string;
  quantity: number;
}

type CommandEvent =
  | { action: 'command_created'; payload: any }
  | { action: 'command_closed'; payload: any }
  | { action: 'order_created'; payload: any };

export interface ServerToClientEvents {
  'command:update': (data: CommandEvent) => void;
  'table:update': (data: TableEvent) => void;
}

export class CommandService {
  constructor(private readonly io: Server<any, ServerToClientEvents>) {}

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
    const result = await prisma.$transaction(async tx => {
      const counter = await tx.counter.upsert({
        where: { name: 'global_order_number' },
        update: { seq: { increment: 1 } },
        create: { name: 'global_order_number', seq: 1 },
      });

      const table = await tx.table.findUnique({
        where: { id: tableId },
      });

      if (!table) throw new AppError('Mesa inválida!');

      const existing = await tx.command.findFirst({
        where: { tableId, open: true },
      });

      if (existing) {
        throw new AppError('Mesa já está ocupada');
      }

      const uniqueIds = [...new Set(items.map(i => i.productId))];

      const products = await tx.product.findMany({
        where: { id: { in: uniqueIds } },
      });

      if (products.length !== uniqueIds.length) {
        throw new AppError('Produto não encontrado');
      }

      const productMap = new Map(products.map(p => [p.id, p]));

      let total = 0;

      const orderItems: any[] = [];

      for (const item of items) {
        const product = productMap.get(item.productId)!;

        const price = product.price;
        total += price * item.quantity;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price,
        });
      }

      const command = await tx.command.create({
        data: { tableId },
      });

      const order = await tx.order.create({
        data: {
          commandId: command.id,
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

    const { command } = result;

    this.io.to('tables').emit('table:update', {
      action: 'table_updated',
      payload: {
        id: command.tableId,
        isOccupied: true,
      },
    });

    return result;
  }

  async addOrderToCommand(commandId: string, items: Item[]) {
    const order = await prisma.$transaction(async tx => {
      const command = await tx.command.findUnique({
        where: { id: commandId },
      });

      if (!command) throw new AppError('Comanda não existe!');
      if (!command.open) throw new AppError('Comanda fechada!');

      const uniqueIds = [...new Set(items.map(i => i.productId))];

      const products = await tx.product.findMany({
        where: { id: { in: uniqueIds } },
      });

      if (products.length !== uniqueIds.length) {
        throw new AppError('Produto não encontrado');
      }

      const productMap = new Map(products.map(p => [p.id, p]));

      let total = 0;
      const orderItems: any[] = [];

      for (const item of items) {
        const product = productMap.get(item.productId)!;

        const price = product.price;
        total += price * item.quantity;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price,
        });
      }

      const counter = await tx.counter.upsert({
        where: { name: 'global_order_number' },
        update: { seq: { increment: 1 } },
        create: { name: 'global_order_number', seq: 1 },
      });

      return tx.order.create({
        data: {
          commandId,
          typeOrder: OrderTypeEnum.LOCAL,
          orderNumber: counter.seq,
          status: 'PENDENTE',
          total: Number(total.toFixed(2)),
          items: {
            create: orderItems,
          },
        },
      });
    });

    this.io.to(`command-${order.commandId}`).emit('command:update', {
      action: 'order_created',
      payload: order,
    });

    return order;
  }

  async closeCommand(id: string) {
    const command = await prisma.$transaction(async tx => {
      const existing = await tx.command.findUnique({
        where: { id },
      });

      if (!existing) throw new AppError('Comanda nao encontrada!');
      if (!existing.open) throw new AppError('Comanda já está fechada!');

      return tx.command.update({
        where: { id },
        data: { open: false },
      });
    });

    this.io.to('tables').emit('table:update', {
      action: 'table_updated',
      payload: {
        id: command.tableId,
        isOccupied: false,
      },
    });

    return command;
  }
}
