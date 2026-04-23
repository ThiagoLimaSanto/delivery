import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { TableController } from '../controllers/TableController';
import { authGuard } from '../middleware/auth.middleware';
import { authAdmin } from '../middleware/authAdmin';
import { createTableBodySchema, createTableParamsSchema } from '../schemas/TableSchemas';

export async function tableRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const tableController = new TableController();

  typedApp.get(
    '/todos',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        response: 200,
      },
    },
    tableController.listAllTables.bind(tableController),
  );

  typedApp.get(
    '/ativos',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        response: 200,
      },
    },
    tableController.listTablesActives.bind(tableController),
  );

  typedApp.post(
    '/criar',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        body: createTableBodySchema,
        response: 200,
      },
    },
    tableController.createTable.bind(tableController),
  );

  typedApp.put(
    '/:id',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        params: createTableParamsSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return tableController.updateTable(request as any, reply);
    },
  );

  typedApp.delete(
    '/:id',
    {
      preHandler: [authGuard, authAdmin],
      schema: {
        params: createTableParamsSchema,
        response: 200,
      },
    },
    async (request, reply) => {
      return tableController.removeTable(request as any, reply);
    },
  );
}
