import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ProductController } from '../controllers/ProductController';
import { authGuard } from '../middleware/auth.middleware';
import {
  createProductBodySchema,
  getProductParamsSchema,
} from '../schemas/ProductSchemas';
import { authRoles } from '../middleware/authRoles';
import { UserRole } from '@prisma/client';

export async function productRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const productController = new ProductController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        querystring: z.object({
          categoria: z.string().optional(),
          search: z.string().optional(),
        }),
        response: 200,
      },
    },
    (request, reply) => productController.getAllProducts(request as any, reply),
  );

  typedApp.get(
    '/disponiveis',
    {
      preHandler: [],
      schema: {
        querystring: z.object({
          categoria: z.string().optional(),
          search: z.string().optional(),
        }),
        response: 200,
      },
    },
    (request, reply) =>
      productController.getAllProductsAvaliable(request as any, reply),
  );

  typedApp.post(
    '/cadastrar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        body: createProductBodySchema,
        response: 201,
      },
    },
    (request, reply) => productController.createProduct(request as any, reply),
  );

  typedApp.patch(
    '/:id/editar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        body: createProductBodySchema,
        response: 200,
      },
    },
    (request, reply) => productController.updateProduct(request as any, reply),
  );

  typedApp.patch(
    '/:id/remover',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        params: getProductParamsSchema,
        response: 200,
      },
    },
    (request, reply) => productController.removeProduct(request as any, reply),
  );

  typedApp.patch(
    '/:id/disponibilidade',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        params: getProductParamsSchema,
        response: 200,
      },
    },
    (request, reply) =>
      productController.changeAvailability(request as any, reply),
  );
}
