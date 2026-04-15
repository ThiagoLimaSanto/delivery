import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { OrderActive } from '../../components/OrderActive';
import { OrderHistory } from '../../components/OrderHistory';
import { useSocket } from '../../hook/useWebSocket';
import { MainTemplate } from '../../templates/MainTemplate';

export function Orders() {
  const socket = useSocket();
  const queryClient = useQueryClient();

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

  return (
    <MainTemplate>
      <section className='mt-30 h-calc(100vh-80px) w-screen z-2'>
        <div className='w-[90%] lg:max-w-7xl mx-auto'>
          <OrderActive />
          <OrderHistory />
        </div>
      </section>
    </MainTemplate>
  );
}
