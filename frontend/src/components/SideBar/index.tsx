import { HiOutlineXMark } from 'react-icons/hi2';
import { UseHandleModal } from '../../hook/useHandleModal';
import { SideBarText } from '../SideBarText';

export function SideBar() {
  const { click, handleModal } = UseHandleModal();
  return (
    <div
      className={`${click ? 'translate-x-0' : '-translate-x-full'} fixed shadow-xl transform transition-transform duration-700 ease-in-out top-0 h-screen left-0 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 bg-white z-3`}
    >
      <div className='p-5'>
        <button
          onClick={() => handleModal(click)}
          className='flex items-center justify-center text-black cursor-pointer'
        >
          <HiOutlineXMark size={30} />
        </button>
      </div>
      <SideBarText to={'/'}>Início</SideBarText>
      <SideBarText to={'/cardapio'}>Cardápio</SideBarText>
      <SideBarText to={'/categorias'}>Categorias</SideBarText>
      <SideBarText to={'/sobre'}>Sobre nós</SideBarText>
      <SideBarText to={'/contato'}>Contatos</SideBarText>
    </div>
  );
}
