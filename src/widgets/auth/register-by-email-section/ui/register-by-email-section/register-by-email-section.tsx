import {
  RegistrationForm,
  useRegisterMutation,
  handleRegisterFail,
  handleRegisterSuccess,
  type RegistrationFormValues,
} from '@/features/auth/by-email';
import { core } from '@/shared/api';

export default function RegisterByEmailSection() {
  const { mutateAsync, isPending } = useRegisterMutation();

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      await mutateAsync(values);
      handleRegisterSuccess();
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
