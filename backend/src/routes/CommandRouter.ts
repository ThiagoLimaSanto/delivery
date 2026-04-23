import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CommandController } from '../controllers/Command';
import { authGuard } from '../middleware/auth.middleware';
import {
  createAddOrderToCommandSchema,
  createCommandParamsSchema,
  createCommandSchema,
} from '../schemas/CommandSchemas';
import { UserRole } from '@prisma/client';
import { authRoles } from '../middleware/authRoles';

export async function commandRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const commandController = new CommandController();

  typedApp.get(
    '/listar',
    {
      preHandler: [authGuard, authRoles([UserRole.GARCOM, UserRole.ADMIN])],
      schema: {
        response: 200,
      },
    },
    commandController.listCommand.bind(commandController),
  );

  typedApp.post(
    '/criar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN, UserRole.GARCOM])],
      schema: {
        body: createCommandSchema,
        response: 200,
      },
    },
    commandController.createCommand.bind(commandController),
  );

  typedApp.post(
    '/:id/adicionar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN, UserRole.GARCOM])],
      schema: {
        params: createCommandParamsSchema,
        body: createAddOrderToCommandSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return commandController.addOrderToCommand(request as any, reply);
    },
  );

  typedApp.post(
    '/:id/finalizar',
    {
      preHandler: [authGuard, authRoles([UserRole.ADMIN, UserRole.GARCOM])],
      schema: {
        params: createCommandParamsSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return commandController.closeCommand(request as any, reply);
    },
  );
}
