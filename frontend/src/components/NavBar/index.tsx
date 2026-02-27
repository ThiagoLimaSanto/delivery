import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

type NavBarProps = {
  handleModal: () => void;
  handleModalCarrinho: () => void;
};

export function NavBar({ handleModal, handleModalCarrinho }: NavBarProps) {
  const items = ['Início', 'Cardápio', 'Categorias', 'Contatos'];

  return (
    <nav className='flex justify-between items-center my-4 h-20 fixed inset-0 px-8 pb-2 z-2 bg-black'>
      <div className='flex gap-4'>
        <HiOutlineMenu
          onClick={handleModal}
          className='cursor-pointer text-white'
          size={40}
        />
      </div>
      <ul className='hidden md:flex md:text-white md:gap-8 md:text-xl'>
        {items.map(item => (
          <li
            key={item}
            className='cursor-pointer group border-b-2 border-transparent hover:border-[#97448F]'
          >
            <Link
              to={`/${item.toLowerCase()}`}
              className='transition-transform inline-block group-hover:text-[#97448F] group-hover:-translate-y-1.5  pb-1 font-semibold'
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div className='flex justify-center items-center gap-4'>
        <Link
          to={'/login'}
          className='flex items-center justify-center text-amber-50 bg-[#97448F] py-2 px-8 cursor-pointer hover:bg-[#973b8e] transition-colors hover:scale-105 rounded-md'
        >
          Entrar
        </Link>
        <FaShoppingCart
          onClick={handleModalCarrinho}
          className='hover:scale-105 cursor-pointer'
          size={35}
          color='#97448F'
        />
      </div>
    </nav>
  );
}
