import '@testing-library/jest-dom/vitest';
import { describe, it, beforeEach, beforeAll, afterAll, vi, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import CreateTodoSection from "../create-todo-section";
import { api } from '@/shared/config';

function renderCreateTodoSection() {
  const result = render(<CreateTodoSection />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    )
  });

  const TitleInput = () => result.getByPlaceholderText('제목');

  const changeTitle = async (title: string) => {
    await userEvent.type(TitleInput(), title);
  };

  const ContentInput = () => result.getByPlaceholderText('내용');

  const changeContent = async (content: string) => {
    await userEvent.type(ContentInput(), content);
  }

  const SubmitButton = () => result.getByText('추가');

  const submit = async () => {
    await userEvent.click(SubmitButton());
  }

  return {
    TitleInput,
    ContentInput,
    SubmitButton,
    changeTitle,
    changeContent,
    submit,
  };
}

const server = setupServer();
const spyAlert = vi.spyOn(window, 'alert').mockImplementation(() => null);

beforeAll(() => {
  server.listen();
})

beforeEach(() => {
  cleanup();
  server.resetHandlers();
  spyAlert.mockClear();
});

afterAll(() => {
  server.close();
});

describe("<CreateTodoSection />", () => {
  it('Todo 생성 성공하면 성공을 안내한다.', async () => {
    server.use(
      http.post(`${api.core}/todos`, () => HttpResponse.json({
        data: {title: "1",
        content: "",
        id: "U1czm9qCrZCZGcN3K2yq3",
        createdAt: "2024-10-31T21:56:05.364Z",
        updatedAt: "2024-10-31T21:56:05.364Z"}
      },
      { status: 200 }
      )
    )
    );

    const { submit, changeTitle } = renderCreateTodoSection();

    await changeTitle('1');
    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('생성되었습니다.');
    });
  });

  it('Todo 생성 성공하면 입력값을 초기화한다.', async () => {
    server.use(
      http.post(`${api.core}/todos`, () => HttpResponse.json({
        data: {
          title: "제목",
          content: "내용",
          id: "U1czm9qCrZCZGcN3K2yq3",
          createdAt: "2024-10-31T21:56:05.364Z",
          updatedAt: "2024-10-31T21:56:05.364Z",
        },
      },
      { status: 200 }
      )
    )
    );

    const {
      TitleInput,
      ContentInput,
      changeTitle,
      changeContent,
      submit,
    } = renderCreateTodoSection();

    await changeTitle('제목');
    await changeContent('내용');

    await submit();

    await vi.waitFor(() => {
      expect(TitleInput()).toHaveValue('');
      expect(ContentInput()).toHaveValue('');
    });
  });

  it('401 에러가 발생하면 로그인 필요 안내', async () => {
    server.use(
      http.post(`${api.core}/todos`, () =>
        HttpResponse.json({
          details: 'Token is missing',
        }, { status: 401 })));

    const { submit, changeContent, changeTitle } = renderCreateTodoSection();

    await changeTitle('제목');
    await changeContent('내용');
    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('인증이 만료되었습니다. 다시 로그인해주세요.');
    });
  });

  it('에러가 발생하면 안내한다.', async () => {
    server.use(
      http.post(`${api.core}/todos`, () =>
        HttpResponse.json({
          details: 'input을 다시 확인해주세요',
        }, { status: 400 })));

    const { submit, changeContent, changeTitle } = renderCreateTodoSection();

    await changeTitle('제목');
    await changeContent('내용');
    await submit();

    vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('input을 다시 확인해주세요');
    });
  });
});
