import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { RefreshTokenController } from '../controllers/RefreshTokenController';
import { authGuard } from '../middleware/auth.middleware';

export async function refreshTokenRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();
  const refreshTokenController = new RefreshTokenController();

  typedApp.get(
    '/refresh',
    {
      preHandler: [authGuard],
      schema: {
        response: 201,
      },
    },
    refreshTokenController.refresh.bind(refreshTokenController),
  );
}
