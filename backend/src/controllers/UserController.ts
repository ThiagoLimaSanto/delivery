import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserToken } from '../helpers/createUserToken';
import { CreateUserBody, CreateUserLogin } from '../schemas/UserSchemas';
import { UserService } from '../services/UserService';

const service = new UserService();

export class UserController {
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await service.getAllUsers();

    return reply.status(200).send({ data: users });
  }

  async checkAuth(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send({ message: 'Autenticado!' });
  }

  async createUser(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply,
  ) {
    const { name, email, password, phone } = request.body;

    await service.createUser({
      name,
      email,
      password,
      phone,
    });

    return reply.status(201).send({ message: 'Conta criada!' });
  }

  async Login(
    request: FastifyRequest<{ Body: CreateUserLogin }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body;

    const user = await service.login({ email, password });

    const token = await createUserToken(
      reply,
      user.user.id,
      user.user.name,
      user.user.role,
    );

    const userReponse = {
      name: user.user.name,
      email: user.user.email,
      phone: user.user.phone,
    };

    return reply.status(200).send({ token: token, data: userReponse });
  }

  async updateUser(
    request: FastifyRequest<{
      Body: CreateUserBody;
    }>,
    reply: FastifyReply,
  ) {
    const id = request.user.id;
    const { name, email, password, phone } = request.body;

    await service.updateUser(id, {
      name,
      email,
      password,
      phone,
    });

    return reply.status(200).send({ message: 'Produto atualizado!' });
  }

  async removeUser(request: FastifyRequest, reply: FastifyReply) {
    const id = request.user.id;

    await service.removeUser(id);

    return reply.status(200).send({ message: 'Conta desativada!' });
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    reply.clearCookie('token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return reply.status(200).send({ message: 'Deslogado com sucesso!' });
  }
}
