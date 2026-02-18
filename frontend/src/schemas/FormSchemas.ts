import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email é obrigatório!')
    .email('Formato de email inválido'),
  password: z
    .string()
    .trim()
    .min(1, 'Senha é obrigatório!')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const RegisterSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório!'),
  email: z
    .string()
    .trim()
    .min(1, 'Email é obrigatório!')
    .email('Formato de email inválido'),
  phone: z.string().trim().min(1, 'Telefone é obrigatório!'),
  password: z
    .string()
    .trim()
    .min(1, 'Senha é obrigatório!')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type loginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
