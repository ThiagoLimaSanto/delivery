import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { showMessage } from '../adapters/ShowMessage';

type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
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

type MenuAdmin = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: {
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

export function useMenuAdmin(categoria?: string | null) {
  return useQuery<MenuAdmin[]>({
    queryKey: ['menu', categoria],
    queryFn: async () => {
      const response = await api.get(`/product/todos`, {
        params: {
          categoria: categoria,
        },
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
