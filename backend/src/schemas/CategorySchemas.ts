import z from 'zod';

export const createCategoryBodySchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório!'),
});

export const createCategoryResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const getCategoryParamsSchema = z.object({
  id: z.string(),
});

export type GetCategoryParams = z.infer<typeof getCategoryParamsSchema>;
export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;
