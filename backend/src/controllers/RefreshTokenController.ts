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
    const date = new Date();

    const tokenDb = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenDb || tokenDb.expiresAt < date) {
      if (tokenDb)
        await prisma.refreshToken.delete({ where: { id: tokenDb.id } });
      
      console.log("entrei aqui");
      
      return reply
        .clearCookie('token')
        .clearCookie('refreshToken')
        .status(401)
        .send({ message: 'Sessão expirada, faça login novamente' });
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenDb.userId },
      select: { name: true, role: true },
    });

    await prisma.refreshToken.delete({
      where: { id: tokenDb.id },
    });

    if (!user) {
      throw new AppError('Usuário nao encontrado', 404);
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
