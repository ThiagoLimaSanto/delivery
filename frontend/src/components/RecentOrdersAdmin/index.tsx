import { useRecentListOrders } from '../../hook/useOrder';
import { status } from '../../types/Order';
import { Spinner } from '../Spinner';

export function RecentOrdersAdmin() {
  const { data, isLoading } = useRecentListOrders();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='p-4'>
      <div className=' bg-[#1A1E26] rounded-2xl flex flex-col justify-between border border-[#3b3b3b]'>
        <span className='text-white text-2xl py-7 px-5 uppercase tracking-wider font-semibold '>
          Pedidos Recentes
        </span>
        {data &&
          data.map(items => (
            <div className='border-t border-[#3b3b3b] w-full p-4 justify-between text-white flex'>
              <div key={items.id}>
                <p className='text-lg mb-2'>{items.user.name}</p>
                <div className='max-h-20 overflow-y-auto w-full pr-4 [scrollbar-gutter:stable]'>
                  {items.items.map(item => (
                    <p className='text-md text-[#858a8d]' key={item.id}>
                      {item.quantity}x {item.product.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className='flex flex-col items-end justify-center  gap-2 w-1/2'>
                <p className='text-xl font-bold'>RS {items.total.toFixed(2)}</p>
                <p className='text-sm bg-orange-400/40 rounded-full px-2 text-yellow-500'>
                  {status[items.status]}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
