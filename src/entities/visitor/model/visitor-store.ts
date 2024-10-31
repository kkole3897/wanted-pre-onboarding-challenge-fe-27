import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type Visitor } from './visitor';
import { TOKEN_STORAGE_KEY } from '../constants';

type VisitorState = Visitor;
type VisitorActions = {
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
};

type VisitorStore = VisitorState & VisitorActions;

export const useVisitorStore = create<VisitorStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (accessToken) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: undefined }),
    }),
    {
      name: TOKEN_STORAGE_KEY,
      partialize: (state) => ({
        ...(state.accessToken ? { accessToken: state.accessToken } : {}),
      }),
      version: 0,
    }
  )
);
