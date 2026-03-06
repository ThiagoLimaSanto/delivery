import { FiChevronDown } from 'react-icons/fi';
import { LuSlidersHorizontal } from 'react-icons/lu';
import { useCategories } from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import { Spinner } from '../Spinner';

export function Filter() {
  const { open, handleOpen } = UseHandleModal();
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className={`
    fixed left-1/2 top-1/2
    w-[90%] sm:max-w-xl
    bg-white rounded-2xl shadow-xl p-4
    transition-all duration-300 ease-out
    -translate-x-1/2 z-3
    ${open ? '-translate-y-1/2 opacity-100' : 'translate-y-[100vh] opacity-0'}
  `}
      >
        <div className='w-full h-full flex flex-col gap-2 p-4'>
          <div className='flex justify-between items-center mb-4'>
            <button
              onClick={() => handleOpen(open)}
              className='text-2xl cursor-pointer'
            >
              <FiChevronDown size={25} />
            </button>
            <p className='text-center font-bold'>Filtros</p>
            <button className='text-red-500 cursor-pointer'>Limpar</button>
          </div>
          <div className='flex justify-center h-full w-full gap-2 flex-wrap'>
            <p className='font-semibold w-full mb-4'>Categorias</p>
            {data &&
              data.map(category => (
                <button
                  className='border border-[#ccc] px-3 py-2 cursor-pointer rounded-full hover:bg-[#F2F2F2]'
                  key={category.id}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </div>
      </div>
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
