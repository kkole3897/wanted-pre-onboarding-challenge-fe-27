import { useMutation } from '@tanstack/react-query';

import { core } from '@/shared/api';

export function useDeleteTodoMutation() {
  return useMutation({
    mutationFn: core.todos.remove,
  });
}
