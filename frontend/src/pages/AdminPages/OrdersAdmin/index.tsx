import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FilterOptionsOrder } from '../../../components/FilterOptionsOrder';
import { GridOrders } from '../../../components/GridOrders';
import { Spinner } from '../../../components/Spinner';
import { useListOrders, type Order } from '../../../hook/useOrder';
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
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<FilterType>('Todos');

  useEffect(() => {
    const socket = io('http://localhost:3333', { transports: ['websocket'] });

    socket.on('orderUpdate', () => {
      queryClient.invalidateQueries({
        queryKey: ['order'],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
