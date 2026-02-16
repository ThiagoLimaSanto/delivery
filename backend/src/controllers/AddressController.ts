import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateAddressBody, GetAddressParams } from '../schemas/AddressSchemas';
import { AddressService } from '../services/AddressService';

const service = new AddressService();

export class AddressController {
  async getAllAddressForUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const address = await service.getAllAddressForUser(userId);

    return reply.status(200).send({ data: address });
  }

  async createAddress(
    request: FastifyRequest<{ Body: CreateAddressBody }>,
    reply: FastifyReply,
  ) {
    const { street, number, district, city, state, zipCode } = request.body;
    const userId = request.user.id;

    await service.createAddress({
      userId,
      street,
      number,
      district,
      city,
      state,
      zipCode,
    });

    return reply.status(201).send({ message: 'Endereço criado com sucesso!' });
  }

  async updateAddress(
    request: FastifyRequest<{
      Body: CreateAddressBody;
      Params: GetAddressParams;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const userId = request.user.id;
    const { street, number, district, city, state, zipCode } = request.body;

    await service.updateAddress(id, {
      street,
      number,
      district,
      city,
      state,
      zipCode,
      userId,
    });

    return reply.status(200).send({ message: 'Endereço atualizado!' });
  }

  async removeAddress(
    request: FastifyRequest<{ Params: GetAddressParams }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const userId = request.user.id;

    await service.removeAddress(id, userId);

    return reply.status(200).send({ message: 'Endereço removido!' });
  }
}
