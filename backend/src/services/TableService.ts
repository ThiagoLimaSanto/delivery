import { Server } from 'socket.io';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';

export type TableEvent =
  | { action: 'table_created'; payload: any }
  | { action: 'table_updated'; payload: any }
  | { action: 'table_deleted'; payload: any };

export interface ServerToClientEvents {
  'table:update': (data: TableEvent) => void;
}

export class TableService {
  constructor(private readonly io: Server<any, ServerToClientEvents>) {}

  async listAllTables() {
    return prisma.table.findMany();
  }

  async listTablesActives() {
    const tables = await prisma.table.findMany({
      where: { active: true },
      include: {
        commands: {
          where: { open: true },
        },
      },
    });

    return tables.map(table => ({
      id: table.id,
      number: table.number,
      isOccupied: table.commands.some(c => c.open),
    }));
  }

  async createTable(number: number) {
    const tableExists = await prisma.table.findFirst({
      where: { number },
    });

    if (tableExists) {
      throw new AppError('Mesa já existe!');
    }

    const newTable = await prisma.table.create({
      data: { number },
    });

    this.io.to('tables').emit('table:update', {
      action: 'table_created',
      payload: newTable,
    });

    return newTable;
  }

  async updateTable(id: string) {
    if (!id) throw new AppError('Mesa inválida!');

    const table = await prisma.table.update({
      where: { id },
      data: { active: true },
    });

    this.io.to('tables').emit('table:update', {
      action: 'table_updated',
      payload: table,
    });

    return table;
  }

  async removeTable(id: string) {
    if (!id) throw new AppError('Mesa inválida!');

    const table = await prisma.table.update({
      where: { id },
      data: { active: false },
    });

    this.io.to('tables').emit('table:update', {
      action: 'table_deleted',
      payload: table,
    });

    return table;
  }
}