import '@testing-library/jest-dom/vitest';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateTodoItemForm, {
  type CreateTodoItemFormProps,
} from '../create-todo-item-form';

function renderCreateTodoItemForm(props?: Partial<CreateTodoItemFormProps>) {
  const result = render(<CreateTodoItemForm {...props} />);

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

  const submit = async () => {
    await userEvent.click(SubmitButton);
  };

  return {
    TitleInput,
    ContentInput,
    SubmitButton,
    changeTitle,
    changeContent,
    submit,
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
    const { SubmitButton, changeTitle } = renderCreateTodoItemForm();

    await changeTitle('1');

    expect(SubmitButton).toBeEnabled();
  });

  it('제출 버튼을 누르면 onSubmit 이벤트가 호출된다.', async () => {
    const handleSubmit = vi.fn();
    const { changeTitle, changeContent, submit } = renderCreateTodoItemForm({
      onSubmit: handleSubmit,
    });

    await changeTitle('1');
    await changeContent('2');
    await submit();

    expect(handleSubmit).toHaveBeenCalledWith({
      title: '1',
      content: '2',
    });
  });
});
