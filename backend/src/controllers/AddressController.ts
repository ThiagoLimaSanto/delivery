import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateAddressBody, GetAddressParams } from '../schemas/AddressSchemas';
import { AddressService } from '../services/AddressService';

const service = new AddressService();

export class AddressController {
  async getDefaultAddressForUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const address = await service.getDefaultAddressForUser(userId);

    return reply.status(200).send({ data: address });
  }

  async getAlltAddressForUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const address = await service.getAllAddressForUser(userId);

    return reply.status(200).send({ data: address });
  }

  async getAddressById(
    request: FastifyRequest<{ Params: GetAddressParams }>,
    reply: FastifyReply,
  ) {
    const userId = request.user.id;
    const addressId = request.params.id;
    const address = await service.getAddressById(userId, addressId);

    return reply.status(200).send({ data: address });
  }

  async createAddress(
    request: FastifyRequest<{ Body: CreateAddressBody }>,
    reply: FastifyReply,
  ) {
    const { street, number, district, city, state, zipCode } = request.body;
    const userId = request.user.id;

    const address = { street, number, district, city, state, zipCode, userId };

    await service.createAddress(address);

    return reply.status(201).send({ message: 'Endereço criado com sucesso!' });
  }

  async toggleDefaultAddressForUser(
    request: FastifyRequest<{ Params: GetAddressParams }>,
    reply: FastifyReply,
  ) {
    const userId = request.user.id;
    const addressId = request.params.id;

    await service.toggleDefaultAddressForUser(addressId, userId);

    return reply.status(200).send({ message: 'Endereço padrao alterado!' });
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

    const address = { street, number, district, city, state, zipCode, userId };

    await service.updateAddress(id, address);

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
