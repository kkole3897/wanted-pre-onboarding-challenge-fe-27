import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  convertSearchParamsToQuery,
  syncSearchParamsWithQuery,
} from './sync-search-params';
import { Query } from '../model';

export function useQueryState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() =>
    convertSearchParamsToQuery(searchParams)
  );

  useEffect(() => {
    const newQuery = convertSearchParamsToQuery(searchParams);
    setQuery(newQuery);
  }, [searchParams]);

  const handleChangeQuery = (newQuery: Query) => {
    setQuery(newQuery);
    setSearchParams(syncSearchParamsWithQuery(searchParams, newQuery));
  };

  return {
    query,
    handleChangeQuery,
  };
}
