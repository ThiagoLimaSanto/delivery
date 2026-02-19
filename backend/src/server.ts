import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyWebsocket from '@fastify/websocket';
import 'dotenv/config';
import { fastify } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { AppError } from './errors/AppError';
import { WebSocketManager } from './helpers/websocketManager';
import { addressRoutes } from './routes/AddressRouter';
import { categoryRoutes } from './routes/CategoryRouter';
import { orderRoutes } from './routes/OrderRouter';
import { productRoutes } from './routes/ProductRouter';
import { usersRoutes } from './routes/UserRouter';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Erro na validação!',
      issues: error.validation,
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  return reply.status(500).send({
    message: 'Internal server error.',
    error
  });
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

if (!process.env.FRONTEND_URL || !process.env.PORT || !process.env.JWT_SECRET) {
  throw new Error('Variaveis de ambiente não definida');
}

app.register(fastifyWebsocket);

app.register(async function (fastify) {
  fastify.get('/ws/orders', { websocket: true }, (connection, req) => {
    WebSocketManager.handleConnection(connection);
  });
});

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
});

app.register(fastifyCors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

app.register(usersRoutes, {
  prefix: '/user',
});
app.register(productRoutes, {
  prefix: '/product',
});
app.register(categoryRoutes, {
  prefix: '/category',
});
app.register(orderRoutes, {
  prefix: '/order',
});
app.register(addressRoutes, {
  prefix: '/address',
});

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
    console.log('Servidor rodando em http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
