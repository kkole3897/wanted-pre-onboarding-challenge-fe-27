import { type AxiosInstance } from 'axios';

import { useVisitorStore } from '@/entities/visitor';
import { unstable_batchedUpdates } from 'react-dom';

function clearAccessToken() {
  unstable_batchedUpdates(() => {
    useVisitorStore.getState().clearAccessToken();
  });
}

export function setAxiosInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const accessToken = useVisitorStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const accessToken = useVisitorStore.getState().accessToken;

        if (accessToken) {
          clearAccessToken();
          alert('로그인이 만료되었습니다. 다시 로그인해주세요');
        } else {
          alert('로그인이 필요합니다.');
        }

        history.pushState(null, '', '/auth');
      }

      return Promise.reject(error);
    }
  );
}
