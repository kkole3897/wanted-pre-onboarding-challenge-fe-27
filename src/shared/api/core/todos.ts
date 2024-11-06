import z from 'zod';
import axios, { AxiosError } from 'axios';

import { client } from './client';

type CreatePayload = {
  title: string;
  content: string;
};

const CreateResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

type CreateResponse = z.infer<typeof CreateResponseSchema>;

export const create = async (
  payload: CreatePayload
): Promise<CreateResponse> => {
  const response = await client.post('/todos', payload);

  return validateCreateResponse(response.data.data);
};

function validateCreateResponse(data: unknown): CreateResponse {
  return CreateResponseSchema.parse(data);
}

const CreateErrorDataSchema = z.object({
  details: z.string(),
});

type CreateErrorData = z.infer<typeof CreateErrorDataSchema>;

type CreateError = AxiosError<CreateErrorData>;

export const isCreateError = (error: unknown): error is CreateError => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return CreateErrorDataSchema.safeParse(error.response?.data).success;
};
