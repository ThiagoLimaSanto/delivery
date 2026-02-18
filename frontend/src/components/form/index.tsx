import { Button } from '../Button';
import { Input } from '../Input';

export function Form() {
  return (
    <form className='flex flex-col items-center w-screen lg:w-[50%]'>
      <Input
        id='email'
        name='email'
        placeholder='Digite o seu email...'
        labelText='E-mail:'
        type='email'
      />
      <Input
        id='password'
        name='password'
        placeholder='Digite a sua senha...'
        labelText='Senha:'
        type='password'
      />
      <Button>Entrar</Button>
    </form>
  );
}
