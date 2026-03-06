import { LuSlidersHorizontal } from 'react-icons/lu';
import { UseHandleModal } from '../../hook/useHandleModal';

export function Filter() {
  const { open, handleOpen } = UseHandleModal();
  return (
    <>
      <div
        className={`${open ? 'block' : 'hidden'} w-100 h-100 absolute right-1/2 left-1/2 -translate-x-1/2 translate-y-1/2  bg-white z-3`}
      ></div>
      <div className='max-w-7xl mx-auto p-4 mb-2'>
        <button
          onClick={() => handleOpen(open)}
          className='flex justify-center items-center gap-2 text-start text-sm bg-white rounded-full py-2 px-4 cursor-pointer hover:bg-[#F2F2F2] transition duration-300 border border-[#ccc]'
        >
          Filtros <LuSlidersHorizontal />
        </button>
      </div>
    </>
  );
}
