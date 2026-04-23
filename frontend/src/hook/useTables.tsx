import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';

export type Tables = {
  id: string;
  number: number;
};

export function useGetActivesTables() {
  return useQuery<Tables[]>({
    queryKey: ['tables'],
    queryFn: async () => {
      const response = await api.get(`/table/ativos`);
      return response.data.data;
    },
  });
}
