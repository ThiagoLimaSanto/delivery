import z from 'zod';

export const createUserBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório!')
    .min(3, 'O nome deve ter pelo menos 3 letras'),
  email: z
    .string()
    .email('Formato de email inválido')
    .trim()
    .min(1, 'Email é obrigatório!'),
  password: z
    .string()
    .trim()
    .min(1, 'Senha é obrigatório!')
    .min(6, 'A senha deve ter pelo menos 6 letras'),
  phone: z.string().trim().min(1, 'Telefone é obrigatório!'),
});

export const createUserLoginSchema = z.object({
  email: z
    .string()
    .email('Formato de email inválido')
    .trim()
    .min(1, 'Email é obrigatório!'),
  password: z.string().trim().min(1, 'Senha é obrigatório!'),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});

export const createUserResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export type CreateUserLogin = z.infer<typeof createUserLoginSchema>;
