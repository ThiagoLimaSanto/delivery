import { UserRole } from '@prisma/client';
import { FastifyReply } from 'fastify';

export async function createUserToken(
  reply: FastifyReply,
  id: string,
  name: string,
  role: UserRole,
) {
  const token = await reply.jwtSign({ id, name, role }, { expiresIn: '7d' });

  const tempoVida = 60 * 60 * 24 * 7;

  reply.setCookie('token', token, {
    httpOnly: true, //impede que o cookie seja acessado pelo javascript
    secure: process.env.NODE_ENV === 'production', //impede que o cookie seja enviado em requisicoes https
    sameSite: 'strict', //impede que o cookie seja enviado em requisicoes de outras origens
    path: '/', //impede que o cookie seja enviado em requisicoes de outras rotas
    maxAge: tempoVida, //tempo de vida do cookie
  });

  return token;
}
