import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';

export class TableService {
  async listAllTables() {
    const tables = await prisma.table.findMany();
    return tables;
  }
  async listTablesActives() {
    const tables = await prisma.table.findMany({ where: { active: true } });
    return tables;
  }
  async createTable(number: number) {
    const tableExists = await prisma.table.findFirst({ where: { number } });
    if (tableExists) throw new AppError('Mesa já existe!');
    const table = await prisma.table.create({ data: { number } });
    return table;
  }

  async updateTable(id: string) {
    if (!id) throw new AppError('Mesa inválida!');
    return await prisma.table.update({ where: { id }, data: { active: true } });
  }

  async removeTable(id: string) {
    if (!id) throw new AppError('Mesa inválida!');
    return await prisma.table.update({ where: { id }, data: { active: false } });
  }
}
