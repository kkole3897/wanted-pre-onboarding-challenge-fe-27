import { unstable_batchedUpdates } from 'react-dom';

import { useVisitorStore } from '@/entities/visitor';

export function handleRegisterSuccess(accessToken: string) {
  const setAccessToken = (accessToken: string) => {
    unstable_batchedUpdates(() => {
      useVisitorStore.getState().setAccessToken(accessToken);
    });
  };

  setAccessToken(accessToken);
  window.alert('계정이 성공적으로 생성되었습니다');
}

export function handleRegisterFail(message?: string) {
  window.alert(
    message ?? '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요'
  );
}
