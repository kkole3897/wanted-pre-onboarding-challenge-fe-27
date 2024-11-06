import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  CreateTodoItemForm,
  useCreateTodoMutation,
  handleCreateError,
} from '@/features/create-todo';
import { queryKeys } from '@/features/query-todos';

export default function CreateTodoSection() {
  const [values, setValues] = useState({ title: '', content: '' });
  const { mutateAsync } = useCreateTodoMutation();
  const queryClient = useQueryClient();

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await mutateAsync(data);
      alert('생성되었습니다.');
      setValues({ title: '', content: '' });
      queryClient.invalidateQueries(queryKeys.getAll);
    } catch (error) {
      handleCreateError(error);
    }
  };

  return (
    <section>
      <CreateTodoItemForm
        values={values}
        onValuesChange={setValues}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
