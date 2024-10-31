import { TodoItemSchema } from '@/entities/todo';

export const CreateTodoItemDataSchema = TodoItemSchema.pick({
  title: true,
  content: true,
});

export type CreateTodoItemData = {
  title: string;
  content: string;
};
