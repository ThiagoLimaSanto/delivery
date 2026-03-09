import { FastifyReply, FastifyRequest } from 'fastify';

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true });
  } catch {
    return reply.status(401).send({
      message: 'Token inválido ou expirado!',
    });
  }
}
