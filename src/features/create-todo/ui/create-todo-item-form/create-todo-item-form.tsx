import { useCreateTodoItemFormValues } from '../../lib';
import { CreateTodoItemData } from '../../model';

export type CreateTodoItemFormProps = {
  submitting?: boolean;
  onSubmit?: (data: CreateTodoItemData) => void;
};

export default function CreateTodoItemForm({
  submitting = false,
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
        <button type="submit" disabled={!isValid || submitting}>
          {submitting ? '처리 중...' : '추가'}
        </button>
      </div>
    </form>
  );
}
