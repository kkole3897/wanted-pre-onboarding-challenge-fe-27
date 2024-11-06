import { SortKey, OrderKey } from '../model';
import { type TodoItem } from '@/entities/todo';
import { sorted } from '@/shared/lib/array';

type SortTodosOptions = {
  /**
   * @default 'createdAt'
   */
  sortBy?: SortKey;
  /**
   * @default 'desc'
   */
  orderBy?: OrderKey;
};

export function sortTodos(todos: TodoItem[], options: SortTodosOptions = {}) {
  const { sortBy = 'created_at', orderBy = 'desc' } = options;

  const reverseConstant = orderBy === 'asc' ? 1 : -1;

  const compareFns = {
    created_at: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.createdAt.localeCompare(b.createdAt),
    updated_at: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.updatedAt.localeCompare(b.updatedAt),
    title: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.title.localeCompare(b.title),
  };

  const compareFn = compareFns[sortBy];

  return sorted(todos, compareFn);
}
