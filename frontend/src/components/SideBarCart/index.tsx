import { HiOutlineXMark } from 'react-icons/hi2';
import type { ModalProps } from '../../types/Modal';

export function SideBarCart({
  clickCarrinho,
  handleModalCarrinho,
}: ModalProps) {
  return (
    <div
      className={`${clickCarrinho ? 'translate-x-0' : 'translate-x-full'} fixed shadow-xl transform transition-transform duration-700 ease-in-out top-24 h-full right-0 w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 bg-white z-3`}
    >
      <div className='p-5'>
        <button
          onClick={handleModalCarrinho}
          className='flex items-center justify-center text-black cursor-pointer'
        >
          <HiOutlineXMark size={30} />
        </button>
      </div>
    </div>
  );
}
