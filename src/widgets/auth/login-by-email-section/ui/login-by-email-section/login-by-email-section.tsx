import {
  LoginForm,
  useLoginMutation,
  handleLoginSuccess,
} from '@/features/auth/by-email';

export default function LoginByEmailSection() {
  const { mutateAsync, isPending } = useLoginMutation();

  const handleSubmit: React.ComponentProps<
    typeof LoginForm
  >['onSubmit'] = async (data) => {
    try {
      const response = await mutateAsync(data);
      handleLoginSuccess(response);
    } catch (error) {}
  };

  return (
    <section>
      <LoginForm submitting={isPending} onSubmit={handleSubmit} />
    </section>
  );
}
