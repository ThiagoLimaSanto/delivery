import { FaShoppingCart } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { UseHandleModal } from '../../hook/useHandleModal';
import { useHandleOrder } from '../../hook/useHandleOrder';
import { NavLink } from '../NavLink';

export function NavBar() {
  const { isAuthenticated } = useAuth();
  const {
    click,
    clickCarrinho,
    handleModal,
    handleModalCarrinho,
    handleProfileClick,
    profileClick,
  } = UseHandleModal();

  const { totalItems } = useHandleOrder();

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
        <NavLink to={'/cardapio'}>Cardápio</NavLink>
        <NavLink to={'/categorias'}>Categorias</NavLink>
        <NavLink to={'/sobre'}>Sobre</NavLink>
        <NavLink to={'/contato'}>Contato</NavLink>
      </ul>
      <div className='flex justify-center items-center gap-6'>
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
          {totalItems > 0 && (
            <div className='flex justify-center items-center absolute h-5 w-5 -bottom-2 -right-2 bg-red-500 rounded-full'>
              <p className='text-white text-md'>{totalItems}</p>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={() => handleProfileClick(profileClick)}
            className='flex items-center justify-center text-white bg-white p-2 cursor-pointer hover:bg-[#f1f1f1] border-2 border-[#ccc] transition-colors hover:scale-105 rounded-full'
          >
            <FiUser color='#ccc' size={25} />
          </button>
        )}
      </div>
    </nav>
  );
}
