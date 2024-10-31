import { useRegistrationForm, type RegistrationFormValues } from '../../lib';

export type RegistrationFormProps = {
  submitting?: boolean;
  onSubmit?: (data: RegistrationFormValues) => void;
};

export default function RegistrationForm({
  submitting = false,
  onSubmit,
}: RegistrationFormProps) {
  const { register, isValid, errors, createHandleSubmit } =
    useRegistrationForm();

  const handleSubmit = createHandleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="email">이메일 *</label>
          <input
            type="email"
            id="email"
            placeholder="이메일"
            required
            aria-describedby="email-error-message"
            aria-invalid={errors.email ? 'true' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error-message" aria-live="polite">
              올바른 이메일 형식을 입력해주세요.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">비밀번호 *</label>
          <p id="password-format-hint">8자 이상의 비밀번호를 입력해주세요.</p>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            required
            aria-describedby="password-error-message password-format-hint"
            aria-invalid={errors.password ? 'true' : undefined}
            {...register('password')}
          />
          {errors.password && (
            <p id="password-error-message" aria-live="polite">
              올바른 비밀번호를 입력해주세요.
            </p>
          )}
        </div>
        <div>
          <button type="submit" disabled={!isValid || submitting}>
            {submitting ? '처리 중' : '회원가입하기'}
          </button>
        </div>
      </div>
    </form>
  );
}
