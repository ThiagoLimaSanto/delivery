import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from '../errors/AppError';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../helpers/createUserToken';
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

    if (!tokenDb || tokenDb.expiresAt < new Date()) {
      if (tokenDb)
        await prisma.refreshToken.delete({ where: { id: tokenDb.id } });

      return reply
        .clearCookie('token')
        .clearCookie('refreshToken')
        .status(401)
        .send({ message: 'Sessão expirada, faça login novamente' });
    }

    await prisma.refreshToken.delete({
      where: { id: tokenDb.id },
    });

    const user = await prisma.user.findUnique({
      where: { id: tokenDb.userId },
    });

    if (!user) {
      return new AppError('Usuário nao encontrado', 404);
    }

    const accessToken = await generateAccessToken(
      reply,
      tokenDb.userId,
      user.name,
      user.role,
    );

    const newRefreshToken = await generateRefreshToken(reply, tokenDb.userId);

    await prisma.refreshToken.create({
      data: {
        userId: tokenDb.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return reply.status(200).send({
      message: 'Token renovado',
      token: accessToken,
    });
  }
}
