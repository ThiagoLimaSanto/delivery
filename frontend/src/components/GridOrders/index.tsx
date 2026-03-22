import { FiCheck, FiClock } from 'react-icons/fi';
import { useListOrders } from '../../hook/useOrder';
import { ItemGridOrder } from '../ItemGridOrder';
import { Spinner } from '../Spinner';

export function GridOrders() {
  const { data, isLoading } = useListOrders({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data?.data.map(order => (
          <ItemGridOrder
            total={order.total}
            order={order}
            key={order.id}
            payment='Pix'
            IconsStatus={FiClock}
            colorTextStatus='text-[#32c560]'
            colorBgStatus='bg-[#204532]'
            ButtonIconm={FiCheck}
            buttonText='Aceitar'
            declineButton={true}
          />
        ))}
      </div>
    </div>
  );
}
