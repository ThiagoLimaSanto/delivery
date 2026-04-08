import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from '../adapters/ShowMessage';
import { api } from '../utils/api';

export type MenuCategory = {
  id: string;
  name: string;
};

export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
};

export type MenuAdmin = Menu & {
  available: boolean;
};

export type MenuPost = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
};

export type MenuUpdate = MenuPost & {
  id: string;
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
    mutationFn: async ({ id, data }: { id: string; data: MenuPost }) => {
      const response = await api.patch(`/product/${id}/editar`, data);
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
