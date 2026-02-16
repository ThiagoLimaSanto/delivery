import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CategoryController } from '../controllers/CategoryController';
import { authGuard } from '../middleware/auth.middleware';
import { authAdmin } from '../middleware/authAdmin';
import {
  createCategoryBodySchema,
  createCategoryResponseSchema,
  getCategoryParamsSchema,
} from '../schemas/CategorySchemas';

export async function categoryRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const categoryController = new CategoryController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        response: 200,
      },
    },
    categoryController.getAllCategory.bind(categoryController),
  );

  typedApp.get(
    '/disponiveis',
    {
      schema: {
        response: 200,
      },
    },
    categoryController.getAllCategoryAvaliable.bind(categoryController),
  );

  typedApp.get(
    '/:id',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        params: getCategoryParamsSchema,
        response: 200,
      },
    },
    categoryController.getCategoryById.bind(categoryController),
  );

  typedApp.post(
    '/cadastrar',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        body: createCategoryBodySchema,
        response: {
          201: createCategoryResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return categoryController.createCategory(request as any, reply);
    },
  );

  typedApp.patch(
    '/:id/editar',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        body: createCategoryBodySchema,
        response: 200,
      },
    },
    categoryController.updateCategory.bind(categoryController),
  );

  typedApp.patch(
    '/:id/disponibilidade',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        params: getCategoryParamsSchema,
        response: 200,
      },
    },
    categoryController.changeAvailability.bind(categoryController),
  );
}
