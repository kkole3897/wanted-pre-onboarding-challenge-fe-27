import { useState } from 'react';

import { CreateTodoItemForm, useCreateTodoMutation } from '@/features/create-todo';

export default function CreateTodoSection() {
  const [values, setValues] = useState({ title: '', content: ''});
  const { mutateAsync } = useCreateTodoMutation();

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      await mutateAsync(data);
      alert('생성되었습니다.');
      setValues({ title: '', content: '' });
    } catch (error) {
      // TODO: 에러 처리
    }
  }

  return (
    <section>
      <CreateTodoItemForm values={values} onValuesChange={setValues} onSubmit={handleSubmit} />
    </section>
  )
}
