import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import type { TypePaymentEnum } from '../components/SubmitOrderButton';
import { api } from '../utils/api';

export type Order = {
  addressId?: string;
  items: { productId: string; quantity: number }[];
};

export type Command = {
  tableId: string;
  items: { productId: string; quantity: number }[];
};

type StatusEnum =
  | 'PENDENTE'
  | 'PREPARANDO'
  | 'SAIU_PARA_ENTREGA'
  | 'ENTREGUE'
  | 'CANCELADO';

export type OrderItemWithProduct = {
  id: string;
  createdAt: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
};

type addresses = {
  id: string;
  street?: string;
  number?: string;
};

type UserWithDefaultAddress = {
  id: string;
  name: string;
  phone: string;
  addresses: addresses[];
};

export type OrderWithUserAndItems = {
  id: string;
  status: StatusEnum;
  createdAt: string;
  updatedAt: string;
  total: number;
  user: UserWithDefaultAddress;
  typePayment: TypePaymentEnum;
  orderNumber: number;
  items: OrderItemWithProduct[];
};

type ListOrdersParams = {
  status?: StatusEnum;
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

export function useListOrders(params?: ListOrdersParams) {
  return useQuery<PaginatedResponse<OrderWithUserAndItems>>({
    queryKey: ['order', 'list', params],

    queryFn: async () => {
      const response = await api.get('/order/admin', {
        params,
      });
      return response.data;
    },
  });
}

export function useRecentListOrders() {
  return useQuery<OrderWithUserAndItems[]>({
    queryKey: ['order', 'list', 'recent'],

    queryFn: async () => {
      const response = await api.get('/order/admin/recent');
      return response.data.data;
    },
  });
}
export function useGetUserOrderHistory() {
  return useQuery<OrderWithUserAndItems[]>({
    queryKey: ['order', 'my', 'history'],

    queryFn: async () => {
      const response = await api.get('/order/my/history');

      return response.data.data;
    },
  });
}

export function useGetOrderActive() {
  return useQuery({
    queryKey: ['order', 'my', 'active'],

    queryFn: async () => {
      const response = await api.get('/order/my/active');

      return response.data.data;
    },
  });
}

export function usePostOrder() {
  const queryClient = useQueryClient();
  return useMutation<Order, unknown, Order>({
    mutationFn: async (OrderData: Order) => {
      const response = await api.post(`/order/criar`, OrderData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', 'my'] });
      showMessage.success('Pedido feito, aguarde a confirmação!');
    },
    onError: () => {
      showMessage.error('Erro ao realizar pedido!');
    },
  });
}

export function useChangeStatusOrder() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await api.patch(`/order/${id}/mudarstatus`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', 'list'] });
      showMessage.dismiss();
      showMessage.success('Status alterado!');
    },
    onError: () => {
      showMessage.dismiss();
      showMessage.error('Erro ao alterar status!');
    },
  });
}

export function useConfirmOrder() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await api.patch(`/order/${id}/confirmar`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', 'list'] });
      showMessage.dismiss();
      showMessage.success('Entrega confirmada!');
    },
    onError: () => {
      showMessage.dismiss();
      showMessage.error('Erro ao confirmar entrega!');
    },
  });
}

export function useOrderCancel() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await api.patch(`/order/${id}/cancelar`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', 'list'] });
      showMessage.success('Pedido Cancelado!');
    },
    onError: () => {
      showMessage.error('Erro ao cancelar Pedido!');
    },
  });
}

export function usePostCommand() {
  const queryClient = useQueryClient();
  return useMutation<Command, unknown, Command>({
    mutationFn: async (CommandData: Command) => {
      const response = await api.post(`/command/criar`, CommandData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['command'] });
      showMessage.success('Pedido feito!');
    },
    onError: error => {
      showMessage.error(error.response?.data?.message);
    },
  });
}
