import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import { api } from '../utils/api';

export type Address = {
  id: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode?: string;
  isDefault?: boolean;
};

export function useGetDefaultAddress() {
  return useSuspenseQuery<Address>({
    queryKey: ['address'],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/address/my`,
      );
      return response.data.data;
    },
  });
}

export function useGetAllAddress() {
  return useSuspenseQuery<Address[]>({
    queryKey: ['address', 'all'],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/address/my/all`,
      );

      return response.data.data;
    },
  });
}

export function useToggleDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/address/${id}/default`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      showMessage.success('Endereço padrao alterado!');
    },
    onError: () => {
      showMessage.error('Erro ao alterar endereço padrao!');
    },
  });
}

export function usePostAddress() {
  const queryClient = useQueryClient();
  return useMutation<Address, unknown, Address>({
    mutationFn: async (addressData: Address) => {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/address/cadastrar`,
        addressData,
      );
      console.log(response);

      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      showMessage.success('Endereço cadastrado com sucesso!');
    },
    onError: () => {
      showMessage.error('Erro ao cadastrar endereço!');
    },
  });
}

export function useDeleteAddres() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log(id);
      
      await api.patch(`/address/${id}/remover`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      showMessage.success('Endereço apagado!');
    },
    onError: () => {
      showMessage.error('Erro ao apagar endereço!');
    },
  });
}