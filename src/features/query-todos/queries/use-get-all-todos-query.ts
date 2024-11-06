import { useQuery } from '@tanstack/react-query';

import { queryKeys } from './query-keys';

export function useGetAllTodosQuery() {
  return useQuery({ ...queryKeys.getAll });
}
