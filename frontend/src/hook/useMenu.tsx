import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';

type Menu = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export function useMenu(categoria?: string | null) {
  return useQuery<Menu[]>({
    queryKey: ['menu', categoria],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/product/disponiveis`,
        {
          params: {
            categoria: categoria,
          },
        },
      );
      return response.data.data;
    },
  });
}
