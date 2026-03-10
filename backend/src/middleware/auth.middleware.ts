import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true });
  } catch {
    return reply.status(401).send({
      message: 'Não autenticado!',
    });
  }
}

export async function refreshTokenGuard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      return reply.status(401).send({
        message: 'Refresh token ausente',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH!);

    request.user = decoded as any;
  } catch {
    return reply.status(401).send({
      message: 'Refresh token inválido',
    });
  }
}
