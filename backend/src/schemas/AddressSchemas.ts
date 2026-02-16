import z from 'zod';

export const createAddressBodySchema = z.object({
  userId: z.string().trim().min(1, 'Usuário é obrigatório!'),
  street: z.string().trim().min(1, 'Nome da rua é obrigatório!'),
  number: z.string().trim().min(1, 'Número é obrigatório!'),
  district: z.string().trim().min(1, 'Bairro é obrigatório!'),
  city: z.string().trim().min(1, 'Cidade é obrigatório!'),
  state: z.string().trim().min(1, 'Estado é obrigatório!'),
  zipCode: z.string().trim().min(1, 'CEP é obrigatório!'),
});

export const createAddressResponseSchema = z.object({
  data: z.object({
    street: z.string().trim().min(1, 'Nome da rua é obrigatório!'),
    number: z.string().trim().min(1, 'Número é obrigatório!'),
    district: z.string().trim().min(1, 'Bairro é obrigatório!'),
    city: z.string().trim().min(1, 'Cidade é obrigatório!'),
    state: z.string().trim().min(1, 'Estado é obrigatório!'),
    zipCode: z.string().trim().min(1, 'CEP é obrigatório!'),
  }),
});

export const getAddressParamsSchema = z.object({
  id: z.string(),
});

export type GetAddressParams = z.infer<typeof getAddressParamsSchema>;

export type CreateAddressBody = z.infer<typeof createAddressBodySchema>;
