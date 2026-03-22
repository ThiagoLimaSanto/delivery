import { useState } from 'react';
import { FilterOfOrdersAdm } from '../FilterOfOrdersAdm';

export function FilterOptionsOrder() {
  const [filter, setFilter] = useState('Todos (4)');

  const handleFilter = (filtro: string) => {
    setFilter(filtro);
  };
  return (
    <div className='flex flex-wrap justify-around text-[#858a8d] bg-[#1A1E26] rounded-lg p-2 gap-2 border border-[#3b3b3b] max-w-lg'>
      <FilterOfOrdersAdm
        handleFilter={handleFilter}
        namefilter={'Todos (4)'}
        filter={filter}
      />
      <FilterOfOrdersAdm
        handleFilter={handleFilter}
        namefilter={`Novos (2) `}
        filter={filter}
        notification={true}
      />
      <FilterOfOrdersAdm
        handleFilter={handleFilter}
        namefilter={'Preparando'}
        filter={filter}
      />
      <FilterOfOrdersAdm
        handleFilter={handleFilter}
        namefilter={'Pronto'}
        filter={filter}
      />
      <FilterOfOrdersAdm
        handleFilter={handleFilter}
        namefilter={'Entregue'}
        filter={filter}
      />
    </div>
  );
}
