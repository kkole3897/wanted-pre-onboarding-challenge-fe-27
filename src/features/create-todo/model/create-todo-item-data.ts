import z from 'zod';

import { TodoItemSchema } from '@/entities/todo';

export const CreateTodoItemDataSchema = z.object({
  title: TodoItemSchema.shape.title.min(1),
  content: TodoItemSchema.shape.content
    .optional()
    .transform((value) => value ?? ''),
});

export type CreateTodoItemData = z.infer<typeof CreateTodoItemDataSchema>;
