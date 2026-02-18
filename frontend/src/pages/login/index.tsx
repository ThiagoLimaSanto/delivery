import { Form } from '../../components/form';
import { Heading } from '../../components/Heading';
import { Logo } from '../../components/Logo';

export function Login() {
  return (
    <div className='flex'>
      <div className="lg:bg-[url('/images/image-login.jpg')] lg:bg-no-repeat lg:bg-cover lg:bg-center lg:w-[60%] lg:h-screen"></div>
      <div className="h-screen w-screen bg-[url('/images/image-login.jpg')] bg-no-repeat bg-cover bg-center lg:bg-none lg:bg-neutral-600 lg:w-[40%] lg:h-screen">
        <div className='flex flex-col justify-center items-center h-screen bg-black/50'>
          <Logo />
          <Heading>Login</Heading>
          <Form />
          <p className='text-amber-50 mt-4'>
            Ainda nao possui uma conta?{' '}
            <a className='text-blue-500' href='/register'>
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
