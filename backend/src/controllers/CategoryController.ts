import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateCategoryBody,
  GetCategoryParams,
} from '../schemas/CategorySchemas';
import { CategoryService } from '../services/CategoryService';

const service = new CategoryService();

export class CategoryController {
  async getAllCategory(request: FastifyRequest, reply: FastifyReply) {
    const categories = await service.getAllCategory();

    return reply.status(200).send({ data: categories });
  }

  async getAllCategoryAvaliable(request: FastifyRequest, reply: FastifyReply) {
    const categories = await service.getAllCategoryAvailable();

    return reply.status(200).send({ data: categories });
  }

  async getCategoryById(
    request: FastifyRequest<{ Params: GetCategoryParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    const category = await service.getCategoryById(id);

    return reply.status(200).send({ data: category });
  }

  async createCategory(
    request: FastifyRequest<{ Body: CreateCategoryBody }>,
    reply: FastifyReply,
  ) {
    const { name } = request.body;

    const category = await service.createCategory({
      name,
    });

    return reply.status(201).send({ data: category });
  }

  async updateCategory(
    request: FastifyRequest<{
      Body: CreateCategoryBody;
      Params: GetCategoryParams;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { name } = request.body;

    await service.updateCategory(id, {
      name,
    });

    return reply.status(200).send({ message: 'Produto atualizado!' });
  }

  async changeAvailability(
    request: FastifyRequest<{ Params: GetCategoryParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    await service.changeAvailability(id);

    return reply.status(200).send({ message: 'Disponibilidade alterada!' });
  }
}
