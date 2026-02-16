import { StatusEnum } from '@prisma/client';
import z from 'zod';

export const createOrderBodySchema = z.object({
  addressId: z.string().trim().min(1, 'Endereço é obrigatório!'),
  userId: z.string().trim().min(1, 'Usuário é obrigatório!'),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1, 'Produto é obrigatório!'),
        quantity: z.number().positive('Quantidade deve ser maior que zero!'),
      }),
    )
    .min(1, 'O pedido deve ter pelo menos um item!'),
});

export const getOrdersQuerySchema = z.object({
  status: z.nativeEnum(StatusEnum).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const createOrderResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const getOrderParamsSchema = z.object({
  id: z.string(),
});

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type getOrdersQuery = z.infer<typeof getOrdersQuerySchema>;
export type GetOrderParams = z.infer<typeof getOrderParamsSchema>;
