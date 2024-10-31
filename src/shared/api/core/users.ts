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

export const registerByEmail = async (
  payload: RegisterByEmailPayload
): Promise<RegisterResponse> => {
  const response = await client.post('/users/create', payload);

  return validateRegisterResponse(response.data);
};
