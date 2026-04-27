import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';

export type Tables = {
  id: string;
  number: number;
  isOccupied: boolean;
};

export function useGetActivesTables() {
  const query = useQuery<Tables[]>({
    queryKey: ['tables'],
    queryFn: async () => {
      const response = await api.get(`/table/ativos`);
      return response.data.data;
    },
  });

  return query;
}
