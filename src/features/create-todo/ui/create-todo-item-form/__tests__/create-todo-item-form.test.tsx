import { describe, beforeEach, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import CreateTodoItemForm from '../create-todo-item-form';

function renderCreateTodoItemForm() {
  const result = render(<CreateTodoItemForm />);

  const TitleInput = result.getByPlaceholderText('제목') as HTMLInputElement;
  const ContentInput = result.getByPlaceholderText(
    '내용'
  ) as HTMLTextAreaElement;
  const SubmitButton = result.getByText('추가') as HTMLButtonElement;

  return {
    TitleInput,
    ContentInput,
    SubmitButton,
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
});
