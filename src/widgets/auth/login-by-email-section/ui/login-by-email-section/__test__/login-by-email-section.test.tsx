import '@testing-library/jest-dom/vitest';
import {
  describe,
  it,
  vi,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import LoginByEmailSection from '../login-by-email-section';
import { TOKEN_STORAGE_KEY } from '@/entities/visitor';
import { api } from '@/shared/config';

function renderLoginByEmailSection() {
  const result = render(<LoginByEmailSection />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    ),
  });

  const EmailInput = result.getByLabelText('이메일') as HTMLInputElement;
  const PasswordInput = result.getByLabelText('비밀번호') as HTMLInputElement;
  const SubmitButton = result.getByText('로그인') as HTMLButtonElement;

  const changeEmail = (email: string) => userEvent.type(EmailInput, email);
  const changePassword = (password: string) =>
    userEvent.type(PasswordInput, password);
  const submit = () => userEvent.click(SubmitButton);

  return {
    EmailInput,
    PasswordInput,
    SubmitButton,
    changeEmail,
    changePassword,
    submit,
  };
}

const server = setupServer();

const spyAlert = vi.spyOn(window, 'alert').mockImplementation(() => null);

beforeEach(() => {
  cleanup();
  server.resetHandlers();
  spyAlert.mockClear();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const token =
  'eyJhbGciOiJIUzI1NiJ9.dGVzdDFAZW1haWwuY29t.Ooqf67TDpYpUY6DHaaJX3upGWi8_A1d9t-OcRhx3_O4';

describe('<LoginByEmailSection />', () => {
  it('기본 필드 렌더링', () => {
    const { EmailInput, PasswordInput, SubmitButton } =
      renderLoginByEmailSection();

    expect(EmailInput).toBeInTheDocument();
    expect(PasswordInput).toBeInTheDocument();
    expect(SubmitButton).toBeInTheDocument();
  });

  it('로그인 성공', async () => {
    server.use(
      http.post(`${api.core}/users/login`, () =>
        HttpResponse.json(
          {
            token,
            message: '성공적으로 로그인 했습니다',
          },
          { status: 200 }
        )
      )
    );

    const { submit } = renderLoginByEmailSection();

    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('성공적으로 로그인 했습니다');
    });
    await vi.waitFor(() => {
      const storedToken = JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY)!);
      expect(storedToken.state.accessToken).toBe(token);
    });
  });

  it('로그인에 실패한 경우 실패 응답 메시지를 표시한다.', async () => {
    server.use(
      http.post(`${api.core}/users/login`, () =>
        HttpResponse.json(
          {
            message: '이메일 / 패스워드 값이 비어있습니다',
          },
          { status: 400 }
        )
      )
    );

    const { submit } = renderLoginByEmailSection();

    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith(
        '이메일 / 패스워드 값이 비어있습니다'
      );
    });
  });
});
