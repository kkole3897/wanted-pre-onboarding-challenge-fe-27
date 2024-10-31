import { useCreateTodoItemFormValues } from '../../lib';

export default function CreateTodoItemForm() {
  const { register, isValid } = useCreateTodoItemFormValues();

  return (
    <form>
      <div>
        <input {...register('title')} type="text" placeholder="제목" />
        <textarea name="content" placeholder="내용" />
        <button type="submit" disabled={!isValid}>
          추가
        </button>
      </div>
    </form>
  );
}
