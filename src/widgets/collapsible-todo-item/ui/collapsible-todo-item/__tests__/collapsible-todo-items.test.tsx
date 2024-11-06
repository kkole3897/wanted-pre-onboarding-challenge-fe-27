import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CollapsibleTodoItem, {
  type CollapsibleTodoItemProps,
} from '../collapsible-todo-item';

function renderCollapsibleTodoItem(props: CollapsibleTodoItemProps) {
  const result = render(<CollapsibleTodoItem {...props} />);

  const Title = () => result.getByText(props.todo.title);

  const Content = () => result.queryByText(props.todo.content);

  const OpenButton = () => result.queryByText('열기');

  const CloseButton = () => result.queryByText('닫기');

  const open = async () => userEvent.click(OpenButton()!);

  const close = async () => userEvent.click(CloseButton()!);

  return {
    Title,
    Content,
    OpenButton,
    CloseButton,
    open,
    close,
  };
}

beforeEach(() => {
  cleanup();
});

describe('<CollapsibleTodoItem />', () => {
  it('기본 상태는 접혀있는 상태이다.', () => {
    const { Title, Content, OpenButton } = renderCollapsibleTodoItem({
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
    expect(OpenButton()).toBeInTheDocument();
  });

  it('열기 버튼을 누르면 내용이 나타난다.', async () => {
    const { Content, open, CloseButton } = renderCollapsibleTodoItem({
      todo: {
        id: '1',
        title: '제목',
        content: '내용',
        createdAt: '2024-10-31T21:56:05.364Z',
        updatedAt: '2024-10-31T21:56:05.364Z',
      },
    });

    await open();

    expect(Content()).toBeInTheDocument();
    expect(CloseButton()).toBeInTheDocument();
  });

  it('닫기 버튼을 누르면 내용이 사라진다.', async () => {
    const { Content, open, close, CloseButton, OpenButton } =
      renderCollapsibleTodoItem({
        todo: {
          id: '1',
          title: '제목',
          content: '내용',
          createdAt: '2024-10-31T21:56:05.364Z',
          updatedAt: '2024-10-31T21:56:05.364Z',
        },
      });

    await open();
    await close();

    expect(Content()).not.toBeInTheDocument();
    expect(CloseButton()).not.toBeInTheDocument();
    expect(OpenButton()).toBeInTheDocument();
  });
});
