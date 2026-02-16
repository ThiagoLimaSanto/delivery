import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
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
      schema: {
        response: 200,
      },
    },
    productController.getAllProductsAvaliable.bind(productController),
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
    productController.getProductById.bind(productController),
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
    productController.createProduct.bind(productController),
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
    productController.updateProduct.bind(productController),
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
    productController.changeAvailability.bind(productController),
  );
}
