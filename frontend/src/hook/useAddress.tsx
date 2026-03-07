import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { showMessage } from '../adapters/ShowMessage';

export type Address = {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode?: string;
};

export function useGetAddress() {
  return useQuery<Address>({
    queryKey: ['address'],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/address/my`,
      );
      return response.data.data;
    },
  });
}

export function usePostAddress() {
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
      showMessage.success('Endereço cadastrado com sucesso!');
    },
    onError: () => {
      showMessage.error('Erro ao cadastrar endereço!');
    },
  });
}
