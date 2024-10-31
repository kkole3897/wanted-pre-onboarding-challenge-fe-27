import React, { useMemo, useState } from 'react';

import { CreateTodoItemData, CreateTodoItemDataSchema } from '../model';

type FormValues = Pick<CreateTodoItemData, 'title'>;

export function useCreateTodoItemFormValues() {
  const [values, setValues] = useState<FormValues>({
    title: '',
  });

  const isValid = useMemo(() => {
    return CreateTodoItemDataSchema.safeParse(values).success;
  }, [values]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    if (!values.hasOwnProperty(name)) {
      return;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const register = (name: keyof FormValues) => {
    return {
      name,
      onChange: handleChange,
    };
  };

  return {
    values,
    isValid,
    register,
  };
}
