import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FilterOptionsOrder } from '../../../components/FilterOptionsOrder';
import { GridOrders } from '../../../components/GridOrders';
import { Spinner } from '../../../components/Spinner';
import { useListOrders, type Order } from '../../../hook/useOrder';
import { useSocket } from '../../../hook/useWebSocket';
import { MainTemplateAdmin } from '../../../templates/MainTemplateAdmin';

export type OrderEventType =
  | 'NEW_ORDER'
  | 'CHANGE_STATUS_ORDER'
  | 'CANCEL_ORDER';
export interface OrderUpdatePayload {
  type: OrderEventType;
  orderData: Order;
}

export type FilterType =
  | 'Todos'
  | 'Novos'
  | 'Preparando'
  | 'Despacho'
  | 'Entregue'
  | 'Cancelado';

type StatusEnum =
  | 'PENDENTE'
  | 'PREPARANDO'
  | 'SAIU_PARA_ENTREGA'
  | 'ENTREGUE'
  | 'CANCELADO';

// 🔥 Mapeamento correto
const statusMap: Record<FilterType, StatusEnum | undefined> = {
  Todos: undefined,
  Novos: 'PENDENTE',
  Preparando: 'PREPARANDO',
  Despacho: 'SAIU_PARA_ENTREGA',
  Entregue: 'ENTREGUE',
  Cancelado: 'CANCELADO',
};

export function OrdersAdmin() {
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

  const [status, setStatus] = useState<FilterType>('Todos');

  const parsedStatus = statusMap[status];

  const { data, isLoading } = useListOrders({
    page: 1,
    limit: 9,
    status: parsedStatus,
  });

  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <MainTemplateAdmin>
      <div className='p-4'>
        <div className='mb-8'>
          <h1 className='text-white text-4xl md:text-5xl uppercase tracking-wider font-medium'>
            Pedidos
          </h1>
        </div>
        <FilterOptionsOrder filter={status} handleStatus={setStatus} />
        <GridOrders data={data} />
      </div>
    </MainTemplateAdmin>
  );
}
