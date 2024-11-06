import '@testing-library/jest-dom/vitest';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import CreateTodoItemForm, {
  type CreateTodoItemFormProps,
} from '../create-todo-item-form';

function renderCreateTodoItemForm(props: Partial<CreateTodoItemFormProps> = {}) {
  const { values = { title: '', content: '' }, ...rest } = props;

  const result = render(<CreateTodoItemForm {...rest} values={values} />);

  const TitleInput = () => result.getByPlaceholderText('제목');
  const ContentInput = () => result.getByPlaceholderText('내용');
  const SubmitButton = () => result.getByText('추가');
  const SubmittingButton = () => result.queryByText('처리 중...');

  const changeTitle = async (title: string) => {
    await userEvent.type(TitleInput(), title);
  };

  const changeContent = async (content: string) => {
    await userEvent.type(ContentInput(), content);
  };

  const submit = async () => {
    await userEvent.click(SubmitButton());
  };

  return {
    TitleInput,
    ContentInput,
    SubmitButton,
    SubmittingButton,
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
    const { TitleInput, ContentInput, SubmitButton, SubmittingButton } =
      renderCreateTodoItemForm();

    expect(TitleInput()).toBeInTheDocument();
    expect(ContentInput()).toBeInTheDocument();
    expect(SubmitButton()).toBeInTheDocument();
    expect(SubmitButton()).toBeDisabled();
    expect(SubmittingButton()).not.toBeInTheDocument();
  });

  it('values prop을 통해 초기값을 설정할 수 있다.', () => {
    const { TitleInput, ContentInput } = renderCreateTodoItemForm({
      values: { title: '1', content: '2' },
    });

    expect(TitleInput()).toHaveValue('1');
    expect(ContentInput()).toHaveValue('2');
  });

  it('values는 controlled 속성으로 반드시 onValuesChange로 변경할 값이 전달된다.', async () => {
    const handleChange = vi.fn();

    const { changeTitle, changeContent } =
      renderCreateTodoItemForm({
        onValuesChange: handleChange,
      });

    await changeTitle('1');
    await changeContent('2');

    vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith({
        title: '1',
        content: '',
      });
      expect(handleChange).toHaveBeenCalledWith({
        title: '',
        content: '2',
      });
    });
  });

  it('제목에 값이 있으면 추가 버튼이 활성화된다.', async () => {
    const { SubmitButton } = renderCreateTodoItemForm({
      values: {
        title: '1',
        content: '',
      },
    });

    expect(SubmitButton()).toBeEnabled();
  });

  it('제출 버튼을 누르면 onSubmit 이벤트가 호출된다.', async () => {
    const handleSubmit = vi.fn();
    const { submit } = renderCreateTodoItemForm({
      values: {
        title: 'title',
        content: 'content',
      },
      onSubmit: handleSubmit,
    });

    await submit();

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'title',
      content: 'content',
    });
  });

  it('제출 중에는 추가 버튼이 처리 중으로 바뀌고, 비활성화 된다.', () => {
    const { SubmittingButton } = renderCreateTodoItemForm({ submitting: true });

    expect(SubmittingButton()).toBeInTheDocument();
    expect(SubmittingButton()).toBeDisabled();
  });
});
