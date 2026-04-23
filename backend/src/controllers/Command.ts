import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateAddOrderToCommandBody,
  CreateCommandBody,
  CreateCommandParams,
} from '../schemas/CommandSchemas';
import { CommandService } from '../services/CommandService';

const service = new CommandService();

export class CommandController {
  async listCommand(request: FastifyRequest, reply: FastifyReply) {
    const commands = await service.listCommand();
    return reply.status(200).send({ data: commands });
  }
  async createCommand(
    request: FastifyRequest<{ Body: CreateCommandBody }>,
    reply: FastifyReply,
  ) {
    const { tableId, items } = request.body;
    const command = await service.createCommand(tableId, items);
    return reply.status(201).send({ data: command });
  }

  async addOrderToCommand(
    request: FastifyRequest<{
      Body: CreateAddOrderToCommandBody;
      Params: CreateCommandParams;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { items } = request.body;
    const command = await service.addOrderToCommand(id, items);
    return reply.status(201).send({ data: command });
  }

  async closeCommand(
    request: FastifyRequest<{ Params: CreateCommandParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const command = await service.closeCommand(id);
    return reply.status(201).send({ data: command });
  }
}
