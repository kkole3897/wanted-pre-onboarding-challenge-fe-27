import {
  LoginForm,
  useLoginMutation,
  handleLoginSuccess,
  handleLoginFail,
} from '@/features/auth/by-email';
import { core } from '@/shared/api';

type LoginByEmailSectionProps = {
  onSuccess?: () => void;
};

export default function LoginByEmailSection({
  onSuccess,
}: LoginByEmailSectionProps) {
  const { mutateAsync, isPending } = useLoginMutation();

  const handleSubmit: React.ComponentProps<
    typeof LoginForm
  >['onSubmit'] = async (data) => {
    try {
      const response = await mutateAsync(data);
      handleLoginSuccess(response);
      onSuccess?.();
    } catch (error) {
      if (core.users.isLoginError(error)) {
        handleLoginFail(error.response?.data.message);
      } else {
        handleLoginFail();
      }
    }
  };

  return (
    <section>
      <LoginForm submitting={isPending} onSubmit={handleSubmit} />
    </section>
  );
}
