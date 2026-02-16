import '@fastify/jwt';
import { UserRole } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string;
      name: string;
      role: UserRole;
    };
    user: {
      id: string;
      name: string;
      role: UserRole;
    };
  }
}

export async function getUserByToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: 'Não autorizado!' });
  }
}
