import { FilterOptionsOrder } from '../../../components/FilterOptionsOrder';
import { GridOrders } from '../../../components/GridOrders';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export function OrdersAdmin() {
  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='mb-8'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Pedidos
          </h1>
        </div>
        <FilterOptionsOrder />
        <GridOrders />
      </div>
    </MainTemplateAdmin>
  );
}
