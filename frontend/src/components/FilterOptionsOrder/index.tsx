import type { FilterType } from '../../pages/AdminPages/OrdersAdmin';
import { FilterOfOrdersAdm } from '../FilterOfOrdersAdm';

type FilterOptionsOrderProps = {
  filter: FilterType;
  handleStatus: (status: FilterType) => void;
};

export function FilterOptionsOrder({
  handleStatus,
  filter,
}: FilterOptionsOrderProps) {
  return (
    <div className='flex flex-wrap justify-around text-[#858a8d] bg-[#1A1E26] rounded-lg p-2 gap-2 border border-[#3b3b3b] max-w-2xl'>
      {[
        'Todos',
        'Novos',
        'Preparando',
        'Despacho',
        'Entregue',
        'Cancelado',
      ].map(item => (
        <FilterOfOrdersAdm
          key={item}
          handleStatus={handleStatus}
          handleFilter={handleStatus}
          namefilter={item as FilterType}
          filter={filter}
        />
      ))}
    </div>
  );
}
