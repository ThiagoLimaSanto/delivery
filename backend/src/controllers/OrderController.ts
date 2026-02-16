import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateOrderBody,
  GetOrderParams,
  getOrdersQuery,
} from '../schemas/OrderSchemas';
import { OrderService } from '../services/OrderService';

const service = new OrderService();

export class OrderController {
  async getAllOrder(
    request: FastifyRequest<{ Querystring: { page?: number; limit?: number } }>,
    reply: FastifyReply,
  ) {
    const { page, limit } = request.query;
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 20;
    const orders = await service.getAllOrder(pageNum, limitNum);

    return reply.status(200).send({ data: orders });
  }

  async listOrders(
    request: FastifyRequest<{ Querystring: getOrdersQuery }>,
    reply: FastifyReply,
  ) {
    const { status, page, limit } = request.query;

    const orders = await service.listOrders(status, page, limit);

    return reply.status(200).send({ data: orders });
  }

  async getAllOrderForUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const orders = await service.getAllOrderForUser(userId);

    return reply.status(200).send({ data: orders });
  }

  async getOrderById(
    request: FastifyRequest<{ Params: GetOrderParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const userId = request.user.id;

    const order = await service.getOrderById(id, userId);

    return reply.status(200).send({ data: order });
  }

  async createOrder(
    request: FastifyRequest<{ Body: CreateOrderBody }>,
    reply: FastifyReply,
  ) {
    const { addressId, items } = request.body;
    const userId = request.user.id;

    await service.createOrder({
      addressId,
      userId,
      items,
    });

    return reply.status(201).send({ message: 'Pedido criado com sucesso!' });
  }

  async OrderCancel(
    request: FastifyRequest<{ Params: GetOrderParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const userId = request.user.id;

    await service.OrderCancel(id, userId);

    return reply.status(200).send({ message: 'Pedido Cancelado!' });
  }
}
