import { describe, it, expect } from 'vitest';

import { sortTodos } from '../sort-todos';

describe('sortTodos', () => {
  it('기본 정렬은 created_at의 내림차순이다.', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-11-01T21:56:05.364Z',
        updatedAt: '2024-11-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-11-01T21:56:05.364Z',
        updatedAt: '2024-11-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
    ]);
  });

  it('created_at로 오름차순 정렬', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos, { order: 'asc' });

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
    ]);
  });

  it('updated_at로 내림차순 정렬', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-11-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos, { sortBy: 'updated_at' });

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-11-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
    ]);
  });

  it('updated_at로 오름차순 정렬', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos, {
      sortBy: 'updated_at',
      order: 'asc',
    });

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: '2',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: '1',
        content: '',
      },
    ]);
  });

  it('title로 내림차순 정렬', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: 'a',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: 'b',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos, { sortBy: 'title' });

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: 'b',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: 'a',
        content: '',
      },
    ]);
  });

  it('title로 오름차순 정렬', () => {
    const todos = [
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: 'b',
        content: '',
      },
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: 'a',
        content: '',
      },
    ];

    const sortedTodos = sortTodos(todos, { sortBy: 'title', order: 'asc' });

    expect(sortedTodos).toEqual([
      {
        id: '2',
        createdAt: '2024-10-01T21:56:05.364Z',
        updatedAt: '2024-10-01T21:56:05.364Z',
        title: 'a',
        content: '',
      },
      {
        id: '1',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
        title: 'b',
        content: '',
      },
    ]);
  });
});
