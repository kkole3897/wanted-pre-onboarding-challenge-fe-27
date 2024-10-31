import { useMutation } from '@tanstack/react-query';

import { core } from '@/shared/api';

export function useRegisterMutation() {
  return useMutation({
    mutationFn: core.users.registerByEmail,
  });
}
