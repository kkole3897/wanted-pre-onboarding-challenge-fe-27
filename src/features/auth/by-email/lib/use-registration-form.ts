import { useMemo, useState } from 'react';

import { RegistrationData } from '../model';

export type FormValues = {
  email: string;
  password: string;
};

type FieldError =
  | {
      message: string;
    }
  | boolean;

export function useRegistrationForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<keyof FormValues, FieldError>>({
    email: false,
    password: false,
  });

  const isValid = useMemo(() => {
    const registrationData = new RegistrationData(formValues);

    return registrationData.isValid();
  }, [formValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (!Object.keys(formValues).includes(name)) {
      return;
    }

    const prevValue = formValues[name as keyof FormValues];
    if (prevValue === value) {
      return;
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });

    const registrationData = new RegistrationData(formValues);

    const validationMap: { [key: string]: () => boolean } = {
      email: () => registrationData.isValidEmail(),
      password: () => registrationData.isValidPassword(),
    };

    if (!validationMap[name]) {
      return;
    }

    const currentError = !validationMap[name]();

    const prevError = errors[name as keyof FormValues];

    if (currentError === prevError) {
      return;
    }

    setErrors({
      ...errors,
      [name]: currentError,
    });
  };

  const register = (name: keyof FormValues) => {
    return {
      name,
      onChange: handleChange,
    };
  };

  const createHandleSubmit =
    (onSubmit?: (data: FormValues) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isValid) {
        return;
      }

      onSubmit?.(formValues);
    };

  return {
    formValues,
    handleChange,
    errors,
    register,
    isValid,
    createHandleSubmit,
  };
}
