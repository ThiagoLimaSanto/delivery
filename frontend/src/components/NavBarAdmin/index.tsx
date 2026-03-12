import { LuPanelLeft } from 'react-icons/lu';
import { FiUser } from 'react-icons/fi';
import { UseHandleModal } from '../../hook/useHandleModal';

export function NavBarAdmin() {
  const { clickSideBarAdmin, handleClickSideBarAdmin } = UseHandleModal();
  return (
    <nav className='flex justify-between z-6 items-center bg-[#1A1E26] p-4'>
      <LuPanelLeft
        color='#ccc'
        size={25}
        onClick={() => handleClickSideBarAdmin(clickSideBarAdmin)}
        className='cursor-pointer'
      />
      <button className='rounded-full border border-black bg-[#204532] p-2'>
        <FiUser size={25} color='#32c560' />
      </button>
    </nav>
  );
}
