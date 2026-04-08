import { LuSearch } from 'react-icons/lu';
import { FiChevronDown } from 'react-icons/fi';

export function SearchProduct() {
  return (
    <div className='flex gap-4 mt-8 lg:max-w-5xl'>
      <div className='flex justify-center text-[#ccc] p-2 items-center gap-2 border border-[#3b3b3b] rounded-lg w-1/2'>
        <LuSearch />
        <input
          className='outline-none w-full'
          type='text'
          placeholder={'Buscar item...'}
        />
      </div>
      <button className='text-[#ccc] border border-[#3b3b3b] flex justify-center items-center gap-2 rounded-lg p-2 cursor-pointer'>
        Todas Categorias <FiChevronDown />
      </button>
    </div>
  );
}
