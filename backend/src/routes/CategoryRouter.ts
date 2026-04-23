import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CategoryController } from '../controllers/CategoryController';
import { authGuard } from '../middleware/auth.middleware';
import {
  createCategoryBodySchema,
  createCategoryResponseSchema,
  getCategoryParamsSchema,
} from '../schemas/CategorySchemas';
import { authRoles } from '../middleware/authRoles';
import { UserRole } from '@prisma/client';

export async function categoryRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const categoryController = new CategoryController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
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
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        params: getCategoryParamsSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return categoryController.getCategoryById(request as any, reply);
    },
  );

  typedApp.post(
    '/cadastrar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
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
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        body: createCategoryBodySchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return categoryController.updateCategory(request as any, reply);
    },
  );

  typedApp.patch(
    '/:id/remove',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        params: getCategoryParamsSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return categoryController.removeCategory(request as any, reply);
    },
  );
}
