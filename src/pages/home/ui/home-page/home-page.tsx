import { CreateTodoSection } from '@/widgets/create-todo-section';
import { TodoListSection } from '@/widgets/todo-list-section';
import { CollapsibleTodoItem } from '@/widgets/collapsible-todo-item';
import { LogoutButton } from '@/features/auth/logout';
import { QueryProvider, TodosFetcher } from '@/features/query-todos';

export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <LogoutButton />
      <CreateTodoSection />
      <QueryProvider>
        <TodoListSection>
          <TodosFetcher loader={<div>Loading...</div>}>
            {(todos) => (
              <ul>
                {todos.map((todo) => (
                  <CollapsibleTodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </TodosFetcher>
        </TodoListSection>
      </QueryProvider>
    </main>
  );
}
