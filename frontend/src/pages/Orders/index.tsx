import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { OrderHistory } from '../../components/OrderHistory';
import { Spinner } from '../../components/Spinner';
import { useGetOrderActive } from '../../hook/useOrder';
import { useSocket } from '../../hook/useWebSocket';
import { MainTemplate } from '../../templates/MainTemplate';
import { statusConfig, status as statusOrder } from '../../types/Order';

export function Orders() {
  const { data: order, isLoading } = useGetOrderActive();

  const socket = useSocket();
  const queryClient = useQueryClient();
  const status = order ? statusConfig[order.status] : null;

  useEffect(() => {
    if (!socket) return;

    const handleOrderUpdate = () => {
      queryClient.invalidateQueries({
        queryKey: ['order'],
      });
    };

    socket.on('orderUpdate', handleOrderUpdate);

    return () => {
      socket.off('orderUpdate', handleOrderUpdate);
    };
  }, [socket, queryClient]);

  if (isLoading) return <Spinner />;

  return (
    <MainTemplate>
      <section className='mt-30 h-calc(100vh-80px) w-screen z-2'>
        <div className='w-[90%] lg:max-w-7xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-semibold text-black mb-6'>
              Meus Pedidos
            </h1>
            {order && status && (
              <>
                <div className='bg-white flex flex-col gap-4 rounded-lg border border-gray-200 p-4 text-black shadow-sm max-w-lg'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <p className='text-gray-500'>
                        N° do pedido: #{order.orderNumber}
                      </p>
                      <p
                        className={`flex items-center gap-2 text-sm rounded-full`}
                      >
                        <status.icon />
                        {statusOrder[order.status]}
                      </p>
                    </div>
                    <p className='text-gray-500'>
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className='bg-gray-100 p-4 rounded-lg'>
                    {order.items.map(item => (
                      <div
                        key={item.productId}
                        className='flex justify-between'
                      >
                        <p className='font-semibold text-black'>
                          {item.quantity}x {item.product.name}
                        </p>
                        <p className='text-black'>
                          R$ {item.product.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className='flex flex-col gap-2 border-t border-gray-300 mt-2 pt-2'>
                      <p className='text-gray-500 text-sm flex justify-between'>
                        Taxa de Entrega <span>R$ 3,90</span>
                      </p>
                      <p className='font-extrabold flex justify-between text-black'>
                        Total: <span>R$ {(order.total + 3).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <OrderHistory />
        </div>
      </section>
    </MainTemplate>
  );
}
