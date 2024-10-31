import { TOKEN_STORAGE_KEY } from '../constants';

export const getAccessToken = (): string | null => {
  const tokenStorage = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!tokenStorage) {
    return null;
  }

  const parsedTokenStorage = JSON.parse(tokenStorage);

  return parsedTokenStorage?.state?.accessToken ?? null;
};

export const clear = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
