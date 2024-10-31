import '@testing-library/jest-dom/vitest';
import { describe, beforeEach, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateTodoItemForm from '../create-todo-item-form';

function renderCreateTodoItemForm() {
  const result = render(<CreateTodoItemForm />);

  const TitleInput = result.getByPlaceholderText('제목') as HTMLInputElement;
  const ContentInput = result.getByPlaceholderText(
    '내용'
  ) as HTMLTextAreaElement;
  const SubmitButton = result.getByText('추가') as HTMLButtonElement;

  const changeTitle = async (title: string) => {
    await userEvent.type(TitleInput, title);
  };

  const changeContent = async (content: string) => {
    await userEvent.type(ContentInput, content);
  };

  return {
    TitleInput,
    ContentInput,
    SubmitButton,
    changeTitle,
    changeContent,
  };
}

beforeEach(() => {
  cleanup();
});

describe('<CreateTodoItemForm />', () => {
  it('기본 엘리먼트 렌더링', () => {
    const { TitleInput, ContentInput, SubmitButton } =
      renderCreateTodoItemForm();

    expect(TitleInput).toBeInTheDocument();
    expect(ContentInput).toBeInTheDocument();
    expect(SubmitButton).toBeInTheDocument();
    expect(SubmitButton).toBeDisabled();
  });

  it('제목과 내용을 입력할 수 있다.', async () => {
    const { TitleInput, ContentInput, changeTitle, changeContent } =
      renderCreateTodoItemForm();

    await changeTitle('1');
    await changeContent('2');

    expect(TitleInput).toHaveValue('1');
    expect(ContentInput).toHaveValue('2');
  });

  it('제목을 입력하면 추가 버튼이 활성화된다.', async () => {
    const { TitleInput, SubmitButton, changeTitle } =
      renderCreateTodoItemForm();

    await changeTitle('1');

    expect(TitleInput).toHaveValue('1');
    expect(SubmitButton).toBeEnabled();
  });
});
