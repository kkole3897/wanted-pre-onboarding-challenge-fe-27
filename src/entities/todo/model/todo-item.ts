import z from 'zod';

export const TodoItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;
