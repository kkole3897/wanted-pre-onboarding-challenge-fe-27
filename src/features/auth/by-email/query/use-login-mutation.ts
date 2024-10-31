import { useMutation } from '@tanstack/react-query';

import { core } from '@/shared/api';

export function useLoginMutation() {
  return useMutation({
    mutationFn: core.users.loginByEmail,
  });
}
