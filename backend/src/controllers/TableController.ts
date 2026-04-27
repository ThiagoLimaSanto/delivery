import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTableBody, CreateTableParams } from '../schemas/TableSchemas';
import { getTableService } from '../helpers/getAllServices';

export class TableController {
  async listAllTables(request: FastifyRequest, reply: FastifyReply) {
    const service = getTableService(request);
    const tables = await service.listAllTables();
    return reply.status(200).send({ data: tables });
  }
  async listTablesActives(request: FastifyRequest, reply: FastifyReply) {
    const service = getTableService(request);
    const tables = await service.listTablesActives();
    return reply.status(200).send({ data: tables });
  }
  async createTable(
    request: FastifyRequest<{ Body: CreateTableBody }>,
    reply: FastifyReply,
  ) {
    const service = getTableService(request);
    const { number } = request.body;
    const table = await service.createTable(number);
    return reply.status(201).send({ data: table });
  }

  async updateTable(
    request: FastifyRequest<{ Params: CreateTableParams }>,
    reply: FastifyReply,
  ) {
    const service = getTableService(request);
    const { id } = request.params;
    const table = await service.updateTable(id);
    return reply.status(200).send({ data: table });
  }

  async removeTable(
    request: FastifyRequest<{ Params: CreateTableParams }>,
    reply: FastifyReply,
  ) {
    const service = getTableService(request);
    const { id } = request.params;
    const table = await service.removeTable(id);
    return reply.status(200).send({ data: table });
  }
}
