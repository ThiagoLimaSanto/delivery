import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import { api } from '../utils/api';

type Order = {
  addressId?: string;
  items: { productId: string; quantity: number }[];
};

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
