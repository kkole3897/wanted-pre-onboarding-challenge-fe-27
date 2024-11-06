import { useMemo } from 'react';

import { useGetAllTodosQuery } from '../../queries';
import { useQueryContext, sortTodos } from '../../lib';
import { TodoItem } from '@/entities/todo';

type TodosFetcherProps = {
  children?: (todos: TodoItem[]) => React.ReactNode;
  loader?: React.ReactNode;
};

export default function TodosFetcher({ children, loader }: TodosFetcherProps) {
  const { query } = useQueryContext();
  const { data, isPending, isError, refetch } = useGetAllTodosQuery();

  const todos = useMemo(() => {
    return sortTodos(data ?? [], query);
  }, [data, query, sortTodos]);

  if (isPending) {
    return loader;
  }

  if (isError) {
    return (
      <div>
        <p>네트워크 오류가 발생했습니다.</p>
        <button onClick={() => refetch()}>재시도</button>
      </div>
    );
  }

  return children?.(todos);
}
