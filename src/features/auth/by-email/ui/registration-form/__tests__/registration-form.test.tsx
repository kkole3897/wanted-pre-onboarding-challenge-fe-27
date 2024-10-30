import { describe, it, expect, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import RegistrationForm from '../registration-form';

function renderRegistrationForm() {
  const result = render(<RegistrationForm />);

  const EmailInput = () =>
    result.getByLabelText('이메일 *') as HTMLInputElement;

  const PasswordInput = () =>
    result.getByLabelText('비밀번호 *') as HTMLInputElement;

  const SubmitButton = () =>
    result.getByText('회원가입하기') as HTMLButtonElement;

  const EmailErrorMessage = () =>
    result.queryByText('올바른 이메일 형식을 입력해주세요.');

  const PasswordErrorMessage = () =>
    result.queryByText('올바른 비밀번호를 입력해주세요.');

  async function changeEmail(email: string) {
    await userEvent.type(EmailInput(), email);
  }

  async function changePassword(password: string) {
    await userEvent.type(PasswordInput(), password);
  }

  return {
    EmailInput,
    PasswordInput,
    SubmitButton,
    EmailErrorMessage,
    PasswordErrorMessage,
    changeEmail,
    changePassword,
  };
}

beforeEach(() => {
  cleanup();
});

describe('<RegistrationForm />', () => {
  it('기본 필드를 렌더링 한다.', () => {
    const {
      EmailInput,
      PasswordInput,
      SubmitButton,
      EmailErrorMessage,
      PasswordErrorMessage,
    } = renderRegistrationForm();

    expect(EmailInput()).toBeInTheDocument();
    expect(PasswordInput()).toBeInTheDocument();
    expect(SubmitButton()).toBeInTheDocument();
    expect(EmailErrorMessage()).not.toBeInTheDocument();
    expect(PasswordErrorMessage()).not.toBeInTheDocument();
  });

  it('이메일을 입력할 수 있다.', async () => {
    const { EmailInput, changeEmail } = renderRegistrationForm();

    const email = 'test@email.com';

    await changeEmail(email);

    expect(EmailInput()).toHaveValue(email);
  });

  it('비밀번호를 입력할 수 있다.', async () => {
    const { PasswordInput, changePassword } = renderRegistrationForm();

    const password = '12345678';

    await changePassword(password);

    expect(PasswordInput()).toHaveValue(password);
  });

  it('버튼은 유효한 값을 완전히 입력했을 경우에만 활성화된다.', async () => {
    const { SubmitButton, changeEmail, changePassword } =
      renderRegistrationForm();

    expect(SubmitButton()).toBeDisabled();

    await changeEmail('test@email.com');
    await changePassword('12345678');

    expect(SubmitButton()).not.toBeDisabled();
  });

  it('잘못된 이메일 형식을 입력했을 경우 안내 메시지를 보여준다.', async () => {
    const { changeEmail, EmailErrorMessage } = renderRegistrationForm();

    await changeEmail('testemail.com');

    expect(EmailErrorMessage()).toBeInTheDocument();
  });

  it('잘못된 비밀번호 형식을 입력했을 경우 안내 메시지를 보여준다.', async () => {
    const { changePassword, PasswordErrorMessage } = renderRegistrationForm();

    await changePassword('1234');

    expect(PasswordErrorMessage()).toBeInTheDocument();
  });
});
