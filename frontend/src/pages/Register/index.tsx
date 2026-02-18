import { Link } from 'react-router-dom';
import { Form } from '../../components/form';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input/index.tsx';
import { Logo } from '../../components/Logo';
import { LoginTemplate } from '../../templates/LoginTemplate.tsx';

export function Register() {
  return (
    <LoginTemplate>
      <Logo />
      <Heading>Login</Heading>
      <Form>
        <Input
          type='text'
          id='name'
          name='name'
          labelText='Nome:'
          placeholder='Digite o seu Nome...'
        />
        <Input
          type='email'
          id='email'
          name='email'
          labelText='E-mail:'
          placeholder='Digite o seu e-mail...'
        />
        <Input
          type='text'
          id='phone'
          name='phone'
          labelText='Telefone:'
          placeholder='Digite o seu telefone...'
        />
        <Input
          type='password'
          id='password'
          name='password'
          labelText='Senha:'
          placeholder='Digite a sua senha...'
        />
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
