import * as Collapsible from '@radix-ui/react-collapsible';

import { type TodoItem } from '@/entities/todo';

export type CollapsibleTodoItemProps = {
  todo: TodoItem;
};

export default function CollapsibleTodoItem({
  todo,
}: CollapsibleTodoItemProps) {
  return (
    <Collapsible.Root>
      <div>
        <div>{todo.title}</div>
        <div>
          <Collapsible.Trigger>열기</Collapsible.Trigger>
        </div>
      </div>
      <Collapsible.Content>{todo.content}</Collapsible.Content>
    </Collapsible.Root>
  );
}
