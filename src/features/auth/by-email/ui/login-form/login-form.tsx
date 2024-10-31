import { LoginData } from '../../model';

type LoginFormProps = {
  submitting?: boolean;
  onSubmit?: (data: LoginData) => void;
};

export default function LoginForm({
  submitting = false,
  onSubmit,
}: LoginFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData) as LoginData;

    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" name="password" />
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          {submitting ? '로그인 중...' : '로그인'}
        </button>
      </div>
    </form>
  );
}
