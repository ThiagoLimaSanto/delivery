import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { OrderController } from '../controllers/OrderController';
import { getUserByToken } from '../middleware/getUserByToken';
import { authGuard } from '../middleware/auth.middleware';
import { authAdmin } from '../middleware/authAdmin';
import {
  createOrderBodySchema,
  getOrderParamsSchema,
  getOrdersQuerySchema,
} from '../schemas/OrderSchemas';

export async function orderRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const orderController = new OrderController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        response: 200,
      },
    },
    (request, reply) => orderController.getAllOrder(request as any, reply),
  );

  typedApp.get(
    '/admin',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        querystring: getOrdersQuerySchema,
        response: 200,
      },
    },
    (request, reply) => orderController.listOrders(request as any, reply),
  );

  typedApp.get(
    '/my',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        response: 200,
      },
    },
    (request, reply) =>
      orderController.getAllOrderForUser(request as any, reply),
  );

  typedApp.get(
    '/:id',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        params: getOrderParamsSchema,
        response: 200,
      },
    },
    (request, reply) => orderController.getOrderById(request as any, reply),
  );

  typedApp.post(
    '/criar',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        body: createOrderBodySchema,
        response: 201,
      },
    },
    (request, reply) => orderController.createOrder(request as any, reply),
  );

  typedApp.patch(
    '/:id/cancelar',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        params: getOrderParamsSchema,
        response: 200,
      },
    },
    (request, reply) => orderController.OrderCancel(request as any, reply),
  );
}
