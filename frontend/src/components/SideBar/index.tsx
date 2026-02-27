import type { ModalProps } from '../../types/Modal';
import { SideBarText } from '../SideBarText';
import { HiOutlineXMark } from "react-icons/hi2";

export function SideBar({ click, handleModal }: ModalProps) {
  return (
    <div
      className={`${click ? 'translate-x-0' : '-translate-x-full'} fixed shadow-xl transform transition-transform duration-700 ease-in-out top-0 h-screen left-0 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 bg-white z-3`}
    >
      <div className='p-5'>
        <button
          onClick={handleModal}
          className='flex items-center justify-center text-black cursor-pointer'
        >
          <HiOutlineXMark size={30}/>
        </button>
      </div>
      <SideBarText>Início</SideBarText>
      <SideBarText>Cardápio</SideBarText>
      <SideBarText>Categorias</SideBarText>
      <SideBarText>Sobre nós</SideBarText>
      <SideBarText>Contatos</SideBarText>
    </div>
  );
}
