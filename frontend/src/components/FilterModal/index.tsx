import { FiChevronDown } from 'react-icons/fi';
import { LuSlidersHorizontal } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hook/useCategories';
import { UseHandleModal } from '../../hook/useHandleModal';
import { MainModalTemplate } from '../../templates/MainModalTemplate';
import { Spinner } from '../Spinner';

export function FilterModal() {
  const { open, handleOpen } = UseHandleModal();
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MainModalTemplate click={!open}>
        <div className='flex justify-between items-center mb-4'>
          <button
            onClick={() => handleOpen(open)}
            className='text-2xl cursor-pointer'
          >
            <FiChevronDown size={25} />
          </button>
          <p className='text-center font-bold'>Filtros</p>
          <Link
            to={'/cardapio'}
            onClick={() => handleOpen(open)}
            className='text-red-500 cursor-pointer'
          >
            Limpar
          </Link>
        </div>
        <div className='flex justify-center h-full w-full gap-2 flex-wrap'>
          <p className='font-semibold w-full mb-4'>Categorias</p>
          {data &&
            data.map(category => (
              <Link
                onClick={() => handleOpen(open)}
                to={`/cardapio?categoria=${category.name}`}
                className='border border-[#ccc] px-3 py-2 cursor-pointer rounded-full hover:bg-[#F2F2F2]'
                key={category.id}
              >
                {category.name}
              </Link>
            ))}
        </div>
      </MainModalTemplate>
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
