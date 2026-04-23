import { GridProductWaiter } from '../../components/GridProductWaiter';
import { OrderSummaryWaiter } from '../../components/OrderSummaryWaiter';
import { TablesWaiter } from '../../components/TablesWaiter';
import { MainTemplateAdmin } from '../../templates/MainTemplateAdmin';

export function Waiter() {
  return (
    <MainTemplateAdmin sidebar={false}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full'>
        <div className='flex flex-col gap-4 w-full'>
          <TablesWaiter />
          <GridProductWaiter />
        </div>
        <OrderSummaryWaiter />
      </div>
    </MainTemplateAdmin>
  );
}
