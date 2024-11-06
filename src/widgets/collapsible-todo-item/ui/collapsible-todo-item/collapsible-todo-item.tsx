import * as Collapsible from '@radix-ui/react-collapsible';
import { useState } from 'react';

import { type TodoItem } from '@/entities/todo';

export type CollapsibleTodoItemProps = {
  todo: TodoItem;
  onDelete?: (data: Pick<TodoItem, 'id'>) => void;
};

export default function CollapsibleTodoItem({
  todo,
  onDelete,
}: CollapsibleTodoItemProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible.Root open={isOpened} onOpenChange={setIsOpened}>
      <div>
        <div>{todo.title}</div>
        <div>
          <button type="button" onClick={() => onDelete?.({ id: todo.id })}>
            삭제
          </button>
          <Collapsible.Trigger>
            {isOpened ? '닫기' : '열기'}
          </Collapsible.Trigger>
        </div>
      </div>
      <Collapsible.Content>{todo.content}</Collapsible.Content>
    </Collapsible.Root>
  );
}
