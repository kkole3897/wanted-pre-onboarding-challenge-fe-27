import {
  RegistrationForm,
  useRegisterMutation,
  handleRegisterFail,
  handleRegisterSuccess,
  type RegistrationFormValues,
} from '@/features/auth/by-email';
import { core } from '@/shared/api';

type RegisterByEmailSectionProps = {
  onSuccess?: () => void;
};

export default function RegisterByEmailSection({
  onSuccess,
}: RegisterByEmailSectionProps) {
  const { mutateAsync, isPending } = useRegisterMutation();

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      const { token } = await mutateAsync(values);

      handleRegisterSuccess(token);
      onSuccess?.();
    } catch (error) {
      if (core.users.isRegisterError(error)) {
        handleRegisterFail(error.response?.data.message);
      } else {
        handleRegisterFail();
      }
    }
  };

  return (
    <section>
      <RegistrationForm submitting={isPending} onSubmit={handleSubmit} />
    </section>
  );
}
