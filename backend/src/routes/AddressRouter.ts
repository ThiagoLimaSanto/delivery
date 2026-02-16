import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { AddressController } from '../controllers/AddressController';
import { getUserByToken } from '../middleware/getUserByToken';
import { authGuard } from '../middleware/auth.middleware';
import {
  createAddressBodySchema,
  getAddressParamsSchema,
} from '../schemas/AddressSchemas';

export async function addressRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const addressController = new AddressController();

  typedApp.get(
    '/my',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        response: 201,
      },
    },
    addressController.getAllAddressForUser.bind(addressController),
  );

  typedApp.post(
    '/cadastrar',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        body: createAddressBodySchema,
        response: 201,
      },
    },
    (request, reply) => addressController.createAddress(request as any, reply),
  );

  typedApp.patch(
    '/:id/editar',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        body: createAddressBodySchema,
        response: 200,
      },
    },
    (request, reply) => addressController.updateAddress(request as any, reply),
  );

  typedApp.patch(
    '/:id/remover',
    {
      preHandler: [authGuard, getUserByToken],
      schema: {
        params: getAddressParamsSchema,
        response: 200,
      },
    },
    addressController.removeAddress.bind(addressController),
  );
}
