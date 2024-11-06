import { createQueryKeys } from '@lukemorales/query-key-factory';

import { core } from '@/shared/api';
export const queryKeys = createQueryKeys('todos', {
  getAll: {
    queryKey: null,
    queryFn: core.todos.getAll,
  },
});
