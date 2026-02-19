import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductBody, GetProductParams } from '../schemas/ProductSchemas';

export async function authGuard(
  request: FastifyRequest<{
    Headers: { authorization: string };
    Body: CreateProductBody;
    Params: GetProductParams;
  }>,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true });
    
  } catch (error) {
    return reply.status(401).send({ message: 'Token inválido ou expirado!' });
  }
}
