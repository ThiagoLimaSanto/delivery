import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserController } from '../controllers/UserController';
import { authGuard } from '../middleware/auth.middleware';
import { getUserByToken } from '../middleware/getUserByToken';
import {
  createUserBodySchema,
  createUserLoginSchema,
  loginResponseSchema,
} from '../schemas/UserSchemas';
import { authRoles } from '../middleware/authRoles';
import { UserRole } from '@prisma/client';

export async function usersRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const userController = new UserController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN])],
      schema: {
        response: 200,
      },
    },
    userController.getAllUsers.bind(userController),
  );

  typedApp.get(
    '/my',
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    userController.checkAuth.bind(userController),
  );

  typedApp.post(
    '/cadastrar',
    {
      schema: {
        body: createUserBodySchema,
        response: 201,
      },
    },
    userController.createUser.bind(userController),
  );

  typedApp.post(
    '/login',
    {
      schema: {
        body: createUserLoginSchema,
        response: 200,
      },
    },
    userController.Login.bind(userController),
  );

  typedApp.post(
    '/logout',
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    userController.logout.bind(userController),
  );

  typedApp.patch(
    '/my/editar',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        body: createUserBodySchema,
        response: 200,
      },
    },
    (request, reply) => userController.updateUser(request as any, reply),
  );

  typedApp.patch(
    '/my/remover',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        response: 200,
      },
    },
    userController.removeUser.bind(userController),
  );
}
