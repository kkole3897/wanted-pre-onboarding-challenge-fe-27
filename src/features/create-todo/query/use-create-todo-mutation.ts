import { useMutation } from '@tanstack/react-query';

import { core } from '@/shared/api';

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: core.todos.create,
  });
}
