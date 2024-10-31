import { useCreateTodoItemFormValues } from '../../lib';
import { CreateTodoItemData } from '../../model';

export type CreateTodoItemFormProps = {
  onSubmit?: (data: CreateTodoItemData) => void;
};

export default function CreateTodoItemForm({
  onSubmit,
}: CreateTodoItemFormProps) {
  const { register, isValid, createHandleSubmit } =
    useCreateTodoItemFormValues();

  const handleSubmit = createHandleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
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
