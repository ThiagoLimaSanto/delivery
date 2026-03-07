import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { UseHandleModal } from '../../hook/useHandleModal';

export function ProfileModal() {
  const { profileClick } = UseHandleModal();
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={`
                      fixed top-53
                      right-18
                      w-60 sm:max-w-xl
                      bg-white rounded-2xl rounded-tr-none shadow-xl p-4
                      transition-all duration-300 ease-out
                      ${profileClick ? '-translate-y-1/2  opacity-100 z-3' : '-translate-y-40 opacity-0'}
                    `}
      >
        <div className='w-full h-full flex flex-col gap-2 p-4'>
          <div className='mb-4'>
            <h1 className='text-xl text-black font-semibold'>
              Olá, {user?.name}
            </h1>
          </div>
          <div className='flex flex-col gap-6'>
            <Link
              className='text-[1.125rem] hover:text-green-600 transition-colors duration-100'
              to={'/my/pedidos'}
            >
              Pedidos
            </Link>
            <Link
              className='text-[1.125rem] hover:text-green-600 transition-colors duration-100'
              to={'/my/pedidos'}
            >
              Meus Dados
            </Link>
            <Link
              className='text-[1.125rem] hover:text-green-600 transition-colors duration-100'
              to={'/my/pedidos'}
            >
              Pedidos
            </Link>
            <button
              onClick={() => logout()}
              className='flex w-15 hover:text-red-600 transition-colors duration-100 justify-start cursor-pointer items-center gap-2'
            >
              <FiLogIn />
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
