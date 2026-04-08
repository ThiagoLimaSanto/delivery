import { UserRole } from '@prisma/client';
import { ObjectId } from 'mongodb';
import { AppError } from '../errors/AppError';
import { hashPassword, verifyPassword } from '../helpers/Argon2';
import { prisma } from '../repository/prisma';
import { CreateUserBody, CreateUserLogin } from '../schemas/UserSchemas';

export class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
  async createUser(data: CreateUserBody) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists)
      throw new AppError('Já existe um usuário com esse email!', 409);

    if (!process.env.PEPPER) {
      throw new AppError('PEPPER não definido');
    }

    const passwordPepper = data.password + process.env.PEPPER;

    const password_hash = await hashPassword(passwordPepper);

    const codeOfDelivery = Number(data.phone.slice(-4));

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        codeOfDelivery: codeOfDelivery,
        password: password_hash,
        role: UserRole.USER,
        active: true,
      },
    });

    return;
  }

  async checkAuth(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    if (!user) throw new AppError('Usuário nao encontrado!', 404);

    return user;
  }

  async login(data: CreateUserLogin) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new AppError('Usuário ou senha incorretos!', 400);

    if (!process.env.PEPPER) {
      throw new AppError('PEPPER não definido');
    }

    const passwordPepper = data.password + process.env.PEPPER;

    const isValidPassword = await verifyPassword(user.password, passwordPepper);

    if (!isValidPassword)
      throw new AppError('Usuário ou senha incorretos!', 400);

    return {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
      },
    };
  }

  async updateUser(id: string, data: CreateUserBody) {
    if (!ObjectId.isValid(id)) throw new AppError('Usuário inválido!', 400);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    const userUpdate = prisma.user.update({
      where: { id },
      data,
    });

    return userUpdate;
  }

  async removeUser(id: string) {
    if (!ObjectId.isValid(id)) throw new AppError('Usuário inválido!', 400);

    const user = await prisma.user.findUnique({
      where: { id, active: true },
    });

    if (!user) throw new AppError('Usuário não encontrado!', 404);

    await prisma.user.update({
      where: { id },
      data: { active: false },
    });

    return;
  }
}
