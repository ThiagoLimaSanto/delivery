import { Button } from '../Button';

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonName?: string;
};

export function Form({ children, onSubmit, buttonName = 'Enviar' }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-center w-full '
    >
      {children}
      <Button>{buttonName}</Button>
    </form>
  );
}
