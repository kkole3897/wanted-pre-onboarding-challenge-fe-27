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

const TodoItemResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

type TodoItemResponse = z.infer<typeof TodoItemResponseSchema>;

function validateGetAllResponse(data: unknown): TodoItemResponse[] {
  return z.array(TodoItemResponseSchema).parse(data);
}

export const getAll = async (): Promise<TodoItemResponse[]> => {
  const response = await client.get('/todos');

  return validateGetAllResponse(response.data.data);
};

const GetAllErrorDataSchema = z.object({
  details: z.string(),
});

type GetAllErrorData = z.infer<typeof GetAllErrorDataSchema>;

type GetAllError = AxiosError<GetAllErrorData>;

export const isGetAllError = (error: unknown): error is GetAllError => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return GetAllErrorDataSchema.safeParse(error.response?.data).success;
};

export const remove = async (id: string) => {
  await client.delete(`/todos/${id}`);
};

const RemoveErrorDataSchema = z.object({
  details: z.string(),
});

const RemoveServerErrorDataSchema = z.object({
  message: z.string(),
});

type RemoveErrorData = z.infer<typeof RemoveErrorDataSchema>;

type RemoveServerErrorData = z.infer<typeof RemoveServerErrorDataSchema>;

type RemoveError = AxiosError<RemoveErrorData>;

type RemoveServerError = AxiosError<RemoveServerErrorData>;

export const isRemoveError = (error: unknown): error is RemoveError => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return RemoveErrorDataSchema.safeParse(error.response?.data).success;
};

export const isRemoveServerError = (
  error: unknown
): error is RemoveServerError => {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  return RemoveServerErrorDataSchema.safeParse(error.response?.data).success;
};
