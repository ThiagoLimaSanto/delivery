import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  return useQuery<Address>({
    queryKey: ['address'],
    queryFn: async () => {
      const response = await api.get(`/address/my`);
      return response.data.data;
    },
  });
}

export function useGetAddressById(addressId: string) {
  return useQuery<Address>({
    queryKey: ['address', addressId],
    queryFn: async () => {
      const response = await api.get(`/address/${addressId}`);

      return response.data.data as Address;
    },
  });
}

export function useGetAllAddress() {
  return useQuery<Address[]>({
    queryKey: ['address', 'all'],
    queryFn: async () => {
      const response = await api.get(`/address/my/all`);

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
      const response = await api.post(`/address/cadastrar`, addressData);
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

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Address) => {
      const response = await api.patch(`/address/${data.id}/editar`, data);
      return response.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] });
      showMessage.success('Endereço atualizado!');
    },
    onError: () => {
      showMessage.error('Erro ao atualizar endereço!');
    },
  });
}

export function useDeleteAddres() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
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
