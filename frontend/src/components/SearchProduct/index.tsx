import { LuSearch } from 'react-icons/lu';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../../hook/useCategories';
import { Spinner } from '../Spinner';

export function SearchProduct() {
  const { data, isLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoria = searchParams.get('categoria');
  const search = searchParams.get('search');

  const handleChange = (value: string) => {
    if (!value) {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', value);
    }

    setSearchParams(searchParams);
  };

  const handleSearch = (value: string) => {
  if (!value) {
    searchParams.delete('search');
  } else {
    searchParams.set('search', value);
  }

  setSearchParams(searchParams);
};

  if (isLoading) return <Spinner />;
  return (
    <div className='flex gap-4 mt-8 lg:max-w-5xl'>
      <div className='flex justify-center text-[#ccc] p-2 items-center gap-2 border border-[#3b3b3b] rounded-lg w-1/2'>
        <LuSearch />
        <input
          className='outline-none w-full'
          type='text'
          placeholder={'Buscar item...'}
          value={search || ''}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <select
        className='text-[#ccc] border border-[#3b3b3b] rounded-lg p-2 bg-transparent cursor-pointer'
        value={categoria || ''}
        onChange={e => handleChange(e.target.value)}
      >
        <option value=''>Todas Categorias</option>
        {data &&
          data.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
}
