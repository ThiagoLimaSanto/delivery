import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form } from '../../components/form';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input/index.tsx';
import { Logo } from '../../components/Logo';
import { FormError } from '../../errors/FormError/index.tsx';
import {
  RegisterSchema,
  type RegisterFormData,
} from '../../schemas/FormSchemas.ts';
import { LoginTemplate } from '../../templates/LoginTemplate.tsx';

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onsubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <LoginTemplate>
      <Logo />
      <Heading>Login</Heading>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <Input
          {...register('name')}
          type='text'
          id='name'
          name='name'
          labelText='Nome:'
          placeholder='Digite o seu Nome...'
        />
        <FormError error={errors.name} />
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
          {...register('phone')}
          type='text'
          id='phone'
          name='phone'
          labelText='Telefone:'
          placeholder='Digite o seu telefone...'
        />
        <FormError error={errors.phone} />
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
        Já possui uma conta?{' '}
        <Link className='text-blue-500 hover:underline' to='/login'>
          Entrar
        </Link>
      </p>
    </LoginTemplate>
  );
}
