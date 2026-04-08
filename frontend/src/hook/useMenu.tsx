import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import { api } from '../utils/api';

export type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
};

export type MenuPost = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};

export type MenuAdmin = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: {
    id: string;
    name: string;
  };
};

export function useMenu(categoria?: string | null) {
  return useQuery<Menu[]>({
    queryKey: ['menu', categoria],
    queryFn: async () => {
      const response = await api.get(`/product/disponiveis`, {
        params: {
          categoria: categoria,
        },
      });
      return response.data.data;
    },
  });
}

export function useMenuAdmin(params?: {
  categoria?: string | undefined;
  search?: string | undefined;
}) {
  return useQuery<MenuAdmin[]>({
    queryKey: ['menu', params],
    queryFn: async () => {
      const response = await api.get(`/product/todos`, {
        params,
      });
      return response.data.data;
    },
  });
}

export function usePostProduct() {
  const queryClient = useQueryClient();
  return useMutation<MenuPost, unknown, MenuPost>({
    mutationFn: async (productData: MenuPost) => {
      const response = await api.post(`/product/cadastrar`, productData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      showMessage.success('Produto cadastrado com sucesso!');
    },
    onError: () => {
      showMessage.error('Erro ao cadastrar produto!');
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MenuAdmin) => {
      const response = await api.patch(`/product/${data.id}/editar`, data);
      return response.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      showMessage.success('Produto atualizado!');
    },
    onError: () => {
      showMessage.error('Erro ao atualizar produto!');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/product/${id}/remover`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      showMessage.success('Produto apagado!');
    },
    onError: () => {
      showMessage.error('Erro ao apagar Produto!');
    },
  });
}

export function useChangeAvailableProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/product/${id}/disponibilidade`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      showMessage.success('Produto alterado!');
    },
    onError: () => {
      showMessage.error('Erro ao alterar Produto!');
    },
  });
}
