import { FastifyReply, FastifyRequest } from 'fastify';
import { generateAccessToken } from '../helpers/createUserToken';
import { prisma } from '../repository/prisma';

export class RefreshTokenController {
  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return reply.status(401).send({ message: 'Token ausente' });
    }

    const tokenDb = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenDb) {
      return reply.status(403).send({ message: 'Token inválido' });
    }

    if (tokenDb.expiresAt < new Date()) {
      return reply.status(403).send({ message: 'token expirado' });
    }

    try {
      request.server.jwt.verify(refreshToken);
    } catch {
      return reply.status(403).send({ message: 'Token inválido' });
    }

    await prisma.refreshToken.delete({
      where: { id: tokenDb.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: tokenDb.userId },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ message: 'Usuário nao encontrado' });
    }

    const accessToken = await generateAccessToken(
      reply,
      tokenDb.userId,
      user.name,
      user.role,
    );

    await prisma.refreshToken.create({
      data: {
        userId: tokenDb.userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { token: accessToken };
  }
}
