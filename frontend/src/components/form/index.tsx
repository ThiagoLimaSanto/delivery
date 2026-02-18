import { Button } from '../Button';

type FormProps = {
  children: React.ReactNode;
};

export function Form({ children }: FormProps) {
  return (
    <form className='flex flex-col items-center w-screen lg:w-[70%]'>
      {children}
      <Button>Entrar</Button>
    </form>
  );
}
