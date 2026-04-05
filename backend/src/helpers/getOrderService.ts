import { FastifyRequest } from "fastify";
import { OrderService } from "../services/OrderService";

export function getOrderService(request: FastifyRequest) {
  return new OrderService(request.server.io);
}