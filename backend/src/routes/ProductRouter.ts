import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { ProductController } from '../controllers/ProductController';
import { authGuard } from '../middleware/auth.middleware';
import { authAdmin } from '../middleware/authAdmin';
import {
  createProductBodySchema,
  getProductParamsSchema,
} from '../schemas/ProductSchemas';

export async function productRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const productController = new ProductController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        response: 200,
      },
    },
    productController.getAllProducts.bind(productController),
  );

  typedApp.get(
    '/disponiveis',
    {
      preHandler: [],
      schema: {
        querystring: z
          .object({
            categoria: z.string().optional(),
          })
          .optional(),
        response: 200,
      },
    },
    (request, reply) =>
      productController.getAllProductsAvaliable(request as any, reply),
  );

  typedApp.get(
    '/:id',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        params: getProductParamsSchema,
        response: 200,
      },
    },
    (request, reply) => productController.getProductById(request as any, reply),
  );

  typedApp.post(
    '/cadastrar',
    {
      preHandler: [authGuard, authAdmin],
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
      preHandler: [authGuard, authAdmin],
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
      preHandler: [authGuard, authAdmin],
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
      preHandler: [authGuard, authAdmin],
      schema: {
        params: getProductParamsSchema,
        response: 200,
      },
    },
    (request, reply) =>
      productController.changeAvailability(request as any, reply),
  );
}
