import { FastifyRequest } from 'fastify';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';
import { TableService } from '../services/TableService';
import { CommandController } from '../controllers/Command';
import { CommandService } from '../services/CommandService';

export function getOrderService(request: FastifyRequest) {
  return new OrderService(request.server.io);
}

export function getProductService(request: FastifyRequest) {
  return new ProductService(request.server.io);
}

export function getTableService(request: FastifyRequest) {
  return new TableService(request.server.io);
}

export function getCommandService(request: FastifyRequest) {
  return new CommandService(request.server.io);
}