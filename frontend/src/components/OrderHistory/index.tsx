import { useGetUserOrderHistory } from '../../hook/useOrder';
import { Spinner } from '../Spinner';
import { statusConfig, status as statusOrder } from '../../types/Order';

export function OrderHistory() {
  const { data, isLoading } = useGetUserOrderHistory();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <p className='text-2xl text-black my-4'>Histórico</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl pb-16 lg:grid-cols-3 md:gap-10 bg-[#F2F2F2]'>
        {data?.map(order => {
          const status = statusConfig[order.status];

          if (!status) return null;

          return (
            <div
              key={order.id}
              className='bg-white flex flex-col gap-4 rounded-lg border border-gray-200 p-4 text-black shadow-sm max-w-lg'
            >
              <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                  <p className='text-gray-500'>
                    N° do pedido: #{order.orderNumber}
                  </p>

                  <p className='flex items-center gap-2 text-sm rounded-full'>
                    <status.icon />
                    {statusOrder[order.status]}
                  </p>
                </div>

                <p className='text-gray-500'>
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className='bg-gray-100 p-4 rounded-lg'>
                <div className='max-h-20 overflow-y-auto w-full pr-3 [scrollbar-gutter:stable]'>
                  {order.items.map(item => (
                    <div key={item.id} className='flex justify-between'>
                      <p className='font-semibold text-black'>
                        {item.quantity}x {item.product.name}
                      </p>
                      <p className='text-black'>
                        R$ {item.product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col gap-2 border-t border-gray-300 mt-2 pt-2'>
                  <p className='text-gray-500 text-sm flex justify-between'>
                    Taxa de Entrega <span>R$ 3,90</span>
                  </p>

                  <p className='font-extrabold flex justify-between text-black'>
                    Total: <span>R$ {(order.total + 3.9).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
