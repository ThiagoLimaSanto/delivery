import z from 'zod';

export const createTableBodySchema = z.object({
  number: z.number().positive('Mesa deve ser maior que zero!'),
});

export const createTableParamsSchema = z.object({
  id: z.string().trim().min(1, 'Mesa é obrigatório!'),
});

export type CreateTableBody = z.infer<typeof createTableBodySchema>;

export type CreateTableParams = z.infer<typeof createTableParamsSchema>;