import { createContext, useContext } from 'react';
import { useQueryState } from './use-query-state';

import { Query } from '../model';

type QueryContextValue = {
  query: Query;
  handleChangeQuery: (newQuery: Query) => void;
};

const QueryContext = createContext<QueryContextValue | undefined>(undefined);

export function useQueryContext() {
  const context = useContext(QueryContext);

  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }

  return context;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const context = useQueryState();

  return (
    <QueryContext.Provider value={context}>{children}</QueryContext.Provider>
  );
}
