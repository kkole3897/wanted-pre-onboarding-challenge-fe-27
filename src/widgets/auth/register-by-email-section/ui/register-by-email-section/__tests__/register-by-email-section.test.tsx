import '@testing-library/jest-dom/vitest';
import {
  beforeEach,
  describe,
  it,
  vi,
  expect,
  beforeAll,
  afterAll,
} from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import RegistrationByEmailSection from '../register-by-email-section';
import { api } from '@/shared/config';

function renderRegistrationByEmailSection() {
  const result = render(<RegistrationByEmailSection />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    ),
  });

  const EmailInput = result.getByLabelText('이메일 *') as HTMLInputElement;

  const PasswordInput = result.getByLabelText('비밀번호 *') as HTMLInputElement;

  const SubmitButton = result.getByText('회원가입하기') as HTMLButtonElement;

  const changeEmail = async (email: string) => {
    await userEvent.type(EmailInput, email);
  };

  const changePassword = async (password: string) => {
    await userEvent.type(PasswordInput, password);
  };

  const submit = async () => {
    await userEvent.click(SubmitButton);
  };

  return {
    SubmitButton,
    changeEmail,
    changePassword,
    submit,
  };
}

const spyAlert = vi.spyOn(window, 'alert').mockImplementation(() => null);

const server = setupServer();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  cleanup();
  server.resetHandlers();
  spyAlert.mockClear();
});

afterAll(() => {
  server.close();
});

describe('<RegistrationByEmailSection />', () => {
  it('회원가입 성공', async () => {
    server.use(
      http.post(`${api.core}/users/create`, () =>
        HttpResponse.json(
          {
            message: '계정이 성공적으로 생성되었습니다',
            token:
              'eyJhbGciOiJIUzI1NiJ9.dGVzdDFAZW1haWwuY29t.Ooqf67TDpYpUY6DHaaJX3upGWi8_A1d9t-OcRhx3_O4',
          },
          { status: 200 }
        )
      )
    );

    const { changeEmail, changePassword, submit } =
      renderRegistrationByEmailSection();

    const email = 'test@email.com';
    const password = '12345678';

    await changeEmail(email);
    await changePassword(password);
    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('계정이 성공적으로 생성되었습니다');
    });
  });

  it('이메일 중복', async () => {
    server.use(
      http.post(`${api.core}/users/create`, () =>
        HttpResponse.json(
          {
            message: '이미 존재하는 유저입니다.',
          },
          { status: 409 }
        )
      )
    );

    const { changeEmail, changePassword, submit } =
      renderRegistrationByEmailSection();

    const email = 'test@email.com';
    const password = '12345678';

    await changeEmail(email);
    await changePassword(password);
    await submit();

    await vi.waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith('이미 존재하는 유저입니다.');
    });
  });
});
