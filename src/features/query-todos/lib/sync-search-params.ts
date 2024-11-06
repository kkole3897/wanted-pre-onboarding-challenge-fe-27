import { type Query, QuerySchema } from '../model';
import { QUERY_KEYS } from '../constants';

export function convertSearchParamsToQuery(
  searchParams: URLSearchParams
): Query {
  const searchObj = Object.fromEntries(searchParams.entries());
  return QuerySchema.parse(searchObj);
}

export function syncSearchParamsWithQuery(
  searchParams: URLSearchParams,
  query: Query
) {
  const newSearchParams = new URLSearchParams(searchParams);

  newSearchParams.set(QUERY_KEYS.Sort, query.sortBy);
  newSearchParams.set(QUERY_KEYS.Order, query.order);

  return newSearchParams;
}
