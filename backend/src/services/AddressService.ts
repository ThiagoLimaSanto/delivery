import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateAddressBody } from '../schemas/AddressSchemas';

export class AddressService {
  async getAllAddressForUser(userId: string) {
    const addresses = await prisma.address.findMany({
      where: { userId: userId, active: true },
    });

    return addresses;
  }

  async createAddress(data: CreateAddressBody) {
    const addressExists = await prisma.address.findFirst({
      where: { userId: data.userId },
    });

    let isDefault = !addressExists;

    const address = await prisma.address.create({
      data: {
        userId: data.userId,
        street: data.street,
        number: data.number,
        district: data.district,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        active: true,
        isDefault,
      },
    });

    return address;
  }

  async updateAddress(id: string, data: CreateAddressBody) {
    if (!ObjectId.isValid(id)) throw new AppError('Endereço inválido!', 400);

    const address = await prisma.address.findFirst({
      where: { id, userId: data.userId },
    });

    if (!address) throw new AppError('Endereço não encontrado!', 404);

    const addressUpdate = prisma.address.update({
      where: { id },
      data,
    });

    return addressUpdate;
  }

  async removeAddress(id: string, userId: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Endereço inválido!', 400);

    const address = await prisma.address.findFirst({
      where: { id, userId: userId, active: true },
    });

    if (!address) throw new AppError('Endereço não encontrado!', 404);

    await prisma.address.update({
      where: { id },
      data: { active: false },
    });

    return;
  }
}
