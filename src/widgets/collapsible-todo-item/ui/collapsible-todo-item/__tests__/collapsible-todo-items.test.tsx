import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';

import CollapsibleTodoItem, {
  type CollapsibleTodoItemProps,
} from '../collapsible-todo-item';

function renderCollapsibleTodoItem(props: CollapsibleTodoItemProps) {
  const result = render(<CollapsibleTodoItem {...props} />);

  const Title = () => result.getByText(props.todo.title);

  const Content = () => result.queryByText(props.todo.content);

  const Trigger = () => result.getByText('열기');

  return {
    Title,
    Content,
    Trigger,
  };
}

beforeEach(() => {
  cleanup();
});

describe('<CollapsibleTodoItem />', () => {
  it('기본 상태는 접혀있는 상태이다.', () => {
    const { Title, Content, Trigger } = renderCollapsibleTodoItem({
      todo: {
        id: '1',
        title: '제목',
        content: '내용',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
      },
    });

    expect(Title()).toBeInTheDocument();
    expect(Content()).not.toBeInTheDocument();
    expect(Trigger()).toBeInTheDocument();
  });
});
