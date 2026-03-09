import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { prisma } from '../repository/prisma';
import { CreateAddressModal } from '../schemas/AddressSchemas';

export class AddressService {
  async getDefaultAddressForUser(userId: string) {
    const addresses = await prisma.address.findFirst({
      where: { userId: userId, active: true, isDefault: true },
    });

    return addresses;
  }

  async getAllAddressForUser(userId: string) {
    const addresses = await prisma.address.findMany({
      where: { userId: userId, active: true },
      orderBy: { isDefault: 'desc' },
    });

    return addresses;
  }

  async getAddressById(userId: string, addressId: string) {
    const address = await prisma.address.findFirst({
      where: { userId: userId, active: true, id: addressId },
    });

    return address;
  }

  async createAddress(data: CreateAddressModal) {
    const addressExists = await prisma.address.findMany({
      where: { userId: data.userId },
    });

    const anyActive = addressExists.some(address => address.active);
    const isDefault = !anyActive;

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

  async toggleDefaultAddressForUser(id: string, userId: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Endereço inválido!', 400);

    const address = await prisma.address.findFirst({
      where: { id, userId, active: true },
    });

    if (!address) {
      throw new AppError('Endereço não encontrado', 404);
    }

    if (address.isDefault) {
      return;
    }

    await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId, active: true, isDefault: true },
        data: { isDefault: false },
      }),

      prisma.address.update({
        where: { id },
        data: { isDefault: true },
      }),
    ]);
  }

  async updateAddress(id: string, data: CreateAddressModal) {
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
