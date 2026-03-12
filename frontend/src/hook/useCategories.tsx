import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';

type Category = {
  id: string;
  name: string;
};

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get(
        `/category/disponiveis`);
      return response.data.data;
    },
  });
}
