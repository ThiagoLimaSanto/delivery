import { FastifyReply, FastifyRequest } from 'fastify';

export async function authWaiter(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user)
    return reply.status(401).send({ message: 'Não autenticado.' });

  if (request.user.role !== 'GARCOM' && request.user.role !== 'ADMIN')
    return reply.status(403).send({ message: 'Nao autorizado!' });
}
