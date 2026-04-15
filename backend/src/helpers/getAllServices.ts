import { FastifyRequest } from 'fastify';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';

export function getOrderService(request: FastifyRequest) {
  return new OrderService(request.server.io);
}

export function getProductService(request: FastifyRequest) {
  return new ProductService(request.server.io);
}
