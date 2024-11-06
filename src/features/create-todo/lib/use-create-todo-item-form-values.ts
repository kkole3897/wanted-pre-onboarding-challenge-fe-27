import React, { useMemo } from 'react';

import { CreateTodoItemData, CreateTodoItemDataSchema } from '../model';

export type FormValues = CreateTodoItemData;

export function useCreateTodoItemFormValues(values: FormValues) {
  const isValid = useMemo(() => {
    return CreateTodoItemDataSchema.safeParse(values).success;
  }, [values]);

  const createHandleChange =
    <T extends HTMLInputElement | HTMLTextAreaElement>(
      onValuesChange?: (values: FormValues) => void
    ) =>
    (event: React.ChangeEvent<T>) => {
      const { name, value } = event.target;

      if (!values.hasOwnProperty(name)) {
        return;
      }

      onValuesChange?.({
        ...values,
        [name]: value,
      });
    };

  const register = (
    name: keyof FormValues,
    {
      onChange,
    }: {
      onChange?: (values: FormValues) => void;
    } = {}
  ) => {
    return {
      name,
      value: values[name],
      onChange: createHandleChange(onChange),
    };
  };

  const createHandleSubmit =
    (onSubmit?: (data: CreateTodoItemData) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const { data, success } = CreateTodoItemDataSchema.safeParse(
        Object.fromEntries(formData.entries())
      );

      if (!success) {
        return;
      }

      onSubmit?.(data);
    };

  return {
    isValid,
    register,
    createHandleSubmit,
  };
}
