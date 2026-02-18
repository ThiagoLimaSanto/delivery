import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form } from '../../components/form';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input/index.tsx';
import { Logo } from '../../components/Logo';
import { FormError } from '../../errors/FormError/index.tsx';
import { loginSchema, type loginFormData } from '../../schemas/FormSchemas.ts';
import { LoginTemplate } from '../../templates/LoginTemplate.tsx';
import { useAuth } from '../../hook/useAuth.tsx';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  async function onsubmit(data: loginFormData) {
    const result = await login(data);

    console.log(result);
  }

  return (
    <LoginTemplate>
      <Logo />
      <Heading>Login</Heading>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <Input
          {...register('email')}
          type='email'
          id='email'
          name='email'
          labelText='E-mail:'
          placeholder='Digite o seu e-mail...'
        />
        <FormError error={errors.email} />
        <Input
          {...register('password')}
          type='password'
          id='password'
          name='password'
          labelText='Senha:'
          placeholder='Digite a sua senha...'
        />
        <FormError error={errors.password} />
      </Form>
      <p className='text-amber-50 mt-4'>
        Ainda não possui uma conta?{' '}
        <Link className='text-blue-500 hover:underline' to='/register'>
          Cadastre-se
        </Link>
      </p>
    </LoginTemplate>
  );
}
