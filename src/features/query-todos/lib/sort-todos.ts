import { SortKey, OrderKey } from '../model';
import { type TodoItem } from '@/entities/todo';
import { sorted } from '@/shared/lib/array';

type SortTodosOptions = {
  /**
   * @default 'created_at'
   */
  sortBy?: SortKey;
  /**
   * @default 'desc'
   */
  order?: OrderKey;
};

export function sortTodos(todos: TodoItem[], options: SortTodosOptions = {}) {
  const { sortBy = 'created_at', order = 'desc' } = options;

  const reverseConstant = order === 'asc' ? 1 : -1;

  const compareFns = {
    created_at: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.createdAt.localeCompare(b.createdAt),
    updated_at: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.updatedAt.localeCompare(b.updatedAt),
    title: (a: TodoItem, b: TodoItem) =>
      reverseConstant * a.title.localeCompare(b.title),
  };

  const compareFn = compareFns[sortBy];

  const result = sorted(todos, compareFn);

  return result;
}
