import { z } from 'zod';

export const createCommandSchema = z.object({
  tableId: z.string(),

  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().positive('Quantidade deve ser maior que zero!'),
      }),
    )
    .min(1, 'Precisa de pelo menos 1 item'),
});

export const createAddOrderToCommandSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().positive('Quantidade deve ser maior que zero!'),
      }),
    )
    .min(1, 'Precisa de pelo menos 1 item'),
});

export const createCommandParamsSchema = z.object({ id: z.string() });

export type CreateCommandBody = z.infer<typeof createCommandSchema>;
export type CreateAddOrderToCommandBody = z.infer<
  typeof createAddOrderToCommandSchema
>;

export type CreateCommandParams = z.infer<typeof createCommandParamsSchema>;
