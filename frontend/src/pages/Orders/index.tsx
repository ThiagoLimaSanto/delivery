import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Image } from '../../components/Image';
import { Spinner } from '../../components/Spinner';
import { useGetUserOrderActive } from '../../hook/useOrder';
import { useSocket } from '../../hook/useWebSocket';
import { MainTemplate } from '../../templates/MainTemplate';
import { statusConfig } from '../../types/Order';
import { status as statusOrder } from '../../types/Order';

export function Orders() {
  const { data: order, isLoading } = useGetUserOrderActive();

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
                    <div key={item.productId} className='flex justify-between'>
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
            )}
            <p className='text-2xl text-black mt-4'>Histórico</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 mx-auto max-w-7xl lg:grid-cols-3 mb-16 md:gap-10 bg-[#F2F2F2]'>
            <div>
              <p className='mb-2'>Data: {'01/01/2023'}</p>
              <div className='flex flex-col gap-2 bg-white rounded-md'>
                <div className='flex gap-4 min-h-0 max-h-80 p-4'>
                  <div className='w-25 h-25'>
                    <Image
                      src={
                        'https://images.unsplash.com/photo-1550547660-d9450f859349'
                      }
                      className='w-full h-full object-cover object-center'
                      alt={'hamburguer'}
                    />
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                      <p>{'Nome do produto'}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                      <p>(Quantidade: {1})</p>
                    </div>
                    <p>R$ {'R$ 99,99'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainTemplate>
  );
}
