import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { UseHandleModal } from '../../hook/useHandleModal';
import { NavLink } from '../NavLink';

export function NavBar() {
  const { isAuthenticated } = useAuth();
  const { click, clickCarrinho, handleModal, handleModalCarrinho } =
    UseHandleModal();

  return (
    <nav
      className={`flex bg-black justify-between items-center h-20 fixed inset-0 px-8 pb-2 z-2`}
    >
      <HiOutlineMenu
        onClick={() => handleModal(click)}
        className='cursor-pointer text-white'
        size={40}
      />
      <ul className='hidden lg:flex md:text-white md:gap-8 md:text-xl'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/cardapio?categoria=Lanches'}>Cardápio</NavLink>
        <NavLink to={'/categorias'}>Categorias</NavLink>
        <NavLink to={'/sobre'}>Sobre</NavLink>
        <NavLink to={'/contato'}>Contato</NavLink>
      </ul>
      <div className='flex justify-center items-center gap-4'>
        {!isAuthenticated && (
          <Link
            to={'/login'}
            className='flex items-center justify-center text-white bg-green-600 py-2 px-8 cursor-pointer hover:bg-green-700 transition-colors hover:scale-105 rounded-md'
          >
            Entrar
          </Link>
        )}
        <div className='flex relative hover:scale-105 cursor-pointer'>
          <FaShoppingCart
            onClick={() => handleModalCarrinho(clickCarrinho)}
            size={35}
            color='#fff'
          />
          <div className='flex justify-center items-center absolute h-5 w-5 -bottom-2 -right-2 bg-red-500 rounded-full'>
            <p className='text-white text-md'>20</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
