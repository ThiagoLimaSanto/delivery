import z from 'zod';

export const createProductBodySchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório!'),
  description: z.string().trim().min(1, 'Descrição é obrigatório!'),
  price: z.number().positive('Preço deve ser maior que zero!'),
  categoryId: z.string().trim().min(1, 'Categoria é obrigatório!'),
  image: z.string().url('URL inválida!').optional(),
});

export const createProductResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    image: z.string(),
    available: z.boolean(),
  }),
});

export const createAllProductResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      category: z.string(),
      image: z.string().optional(),
      available: z.boolean(),
    }),
  ),
});

export const getProductParamsSchema = z.object({
  id: z.string(),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type GetProductParams = z.infer<typeof getProductParamsSchema>;
