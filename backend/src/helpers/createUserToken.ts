import { UserRole } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { cookieOptions } from './cookiesOptions';
import jwt from 'jsonwebtoken';

export async function generateAccessToken(
  reply: FastifyReply,
  id: string,
  name: string,
  role: UserRole,
) {
  const accessToken = await reply.jwtSign(
    { id, name, role },
    { expiresIn: '15m' },
  );

  const tempoVida = 60 * 15;

  reply.setCookie('token', accessToken, {
    ...cookieOptions,
    maxAge: tempoVida,
  });

  return accessToken;
}

export async function generateRefreshToken(reply: FastifyReply, id: string) {
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: '7d',
  });

  const tempoVida = 60 * 60 * 24 * 7;

  reply.setCookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: tempoVida,
  });

  return refreshToken;
}
