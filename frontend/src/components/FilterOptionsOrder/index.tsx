import { useListOrders } from '../../hook/useOrder';
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
  const { data: orders } = useListOrders();

  const notification =
    orders?.data.filter(order => order.status === 'PENDENTE').length ?? 0;

  const filters = [
    { label: 'Todos' },
    {
      label: 'Novos',
      notification: notification > 0,
    },
    { label: 'Preparando' },
    { label: 'Despacho' },
    { label: 'Entregue' },
    { label: 'Cancelado' },
  ];

  return (
    <div className='flex flex-wrap justify-around text-[#858a8d] bg-[#1A1E26] rounded-lg p-2 gap-2 border border-[#3b3b3b] max-w-2xl'>
      {filters.map(item => (
        <FilterOfOrdersAdm
          key={item.label}
          handleStatus={handleStatus}
          handleFilter={handleStatus}
          namefilter={item.label as FilterType}
          filter={filter}
          notification={item.notification}
        />
      ))}
    </div>
  );
}
