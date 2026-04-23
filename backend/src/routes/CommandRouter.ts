import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CommandController } from '../controllers/Command';
import { authGuard } from '../middleware/auth.middleware';
import { authAdmin } from '../middleware/authAdmin';
import {
  createAddOrderToCommandSchema,
  createCommandParamsSchema,
  createCommandSchema,
} from '../schemas/CommandSchemas';
import { authWaiter } from '../middleware/authWaiter';

export async function commandRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const commandController = new CommandController();

  typedApp.get(
    '/listar',
    {
      preHandler: [authGuard, authWaiter],
      schema: {
        response: 200,
      },
    },
    commandController.listCommand.bind(commandController),
  );

  typedApp.post(
    '/criar',
    {
      preHandler: [authGuard, authWaiter],
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
      preHandler: [authGuard, authWaiter],
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
      preHandler: [authGuard, authWaiter],
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
