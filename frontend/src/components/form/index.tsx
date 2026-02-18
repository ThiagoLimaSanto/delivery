import { Button } from '../Button';

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-center w-screen lg:w-[70%] '
    >
      {children}
      <Button>Entrar</Button>
    </form>
  );
}
