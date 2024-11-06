import { core } from '@/shared/api';

const defaultMessage =
  '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

export function handleCreateError(error: unknown) {
  if (core.todos.isCreateError(error)) {
    if (error.status === 401) {
      alert('인증이 만료되었습니다. 다시 로그인해주세요.');
      return;
    }

    alert(error.response?.data.details ?? defaultMessage);
    return;
  }

  alert(defaultMessage);
}
