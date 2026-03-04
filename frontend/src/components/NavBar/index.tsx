import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useEffect, useState } from 'react';
import { NavLink } from '../NavLink';
import { UseHandleModal } from '../../hook/useHandleModal';

export function NavBar() {
  const { isAuthenticated } = useAuth();
  const { click, clickCarrinho, handleModal, handleModalCarrinho } = UseHandleModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`flex ${scrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/50'} justify-between items-center  h-20 fixed inset-0 px-8 pb-2 z-2`}
    >
      <HiOutlineMenu
        onClick={() => handleModal(click)}
        className='cursor-pointer text-white'
        size={40}
      />
      <ul className='hidden md:flex md:text-white md:gap-8 md:text-xl'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/cardapio'}>Cardápio</NavLink>
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
        <FaShoppingCart
          onClick={() => handleModalCarrinho(clickCarrinho)}
          className='hover:scale-105 cursor-pointer'
          size={35}
          color='#fff'
        />
      </div>
    </nav>
  );
}
