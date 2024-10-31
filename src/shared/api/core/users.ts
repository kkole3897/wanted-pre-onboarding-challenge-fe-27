import axios, { type AxiosError } from 'axios';

import { client } from './client';

import z from 'zod';

type RegisterByEmailPayload = {
  email: string;
  password: string;
};

const RegisterResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
});

type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

const validateRegisterResponse = (data: unknown): RegisterResponse => {
  return RegisterResponseSchema.parse(data);
};

const RegisterErrorDataSchema = z.object({
  message: z.string(),
});

type RegisterErrorData = z.infer<typeof RegisterErrorDataSchema>;

type RegisterError = AxiosError<RegisterErrorData>;

export const isRegisterError = (error: unknown): error is RegisterError => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return RegisterErrorDataSchema.safeParse(error.response?.data).success;
};

export const registerByEmail = async (
  payload: RegisterByEmailPayload
): Promise<RegisterResponse> => {
  const response = await client.post('/users/create', payload);

  return validateRegisterResponse(response.data);
};
