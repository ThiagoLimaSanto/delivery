import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import { api } from '../utils/api';

export type Category = {
  id: string;
  name: string;
};

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get(`/category/disponiveis`);
      return response.data.data;
    },
  });
}

export function usePostCategory() {
  const queryClient = useQueryClient();
  return useMutation<Category, unknown, Category>({
    mutationFn: async (data: Category) => {
      const response = await api.post(`/category/cadastrar`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showMessage.success('Categoria cadastrado com sucesso!');
    },
    onError: () => {
      showMessage.error('Erro ao cadastrar Categoria!');
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Category) => {
      const response = await api.patch(`/category/${data.id}/editar`, data);
      return response.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showMessage.success('Categoria atualizado!');
    },
    onError: () => {
      showMessage.error('Erro ao atualizar Categoria!');
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/category/${id}/remove`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showMessage.success('Categoria apagado!');
    },
    onError: () => {
      showMessage.error('Erro ao apagar Categoria!');
    },
  });
}
