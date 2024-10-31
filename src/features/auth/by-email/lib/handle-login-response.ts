import { unstable_batchedUpdates } from 'react-dom';

import { useVisitorStore } from '@/entities/visitor';
import { core } from '@/shared/api';

type SuccessData = Awaited<ReturnType<typeof core.users.loginByEmail>>;

function setAccessToken(token: string) {
  unstable_batchedUpdates(() => {
    useVisitorStore.getState().setAccessToken(token);
  });
}

export function handleLoginSuccess(data: SuccessData) {
  setAccessToken(data.token);
  alert(data.message);
}

export function handleLoginFail(message?: string) {
  alert(message ?? '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}
