import {
  useCreateTodoItemFormValues,
  type CreateTodoItemFormValues,
} from '../../lib';
import { CreateTodoItemData } from '../../model';

export type CreateTodoItemFormProps = {
  values: CreateTodoItemFormValues;
  submitting?: boolean;
  onSubmit?: (data: CreateTodoItemData) => void;
  onValuesChange?: (values: CreateTodoItemFormValues) => void;
};

export default function CreateTodoItemForm({
  values,
  submitting = false,
  onSubmit,
  onValuesChange,
}: CreateTodoItemFormProps) {
  const { register, isValid, createHandleSubmit } =
    useCreateTodoItemFormValues(values);

  const handleSubmit = createHandleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          {...register('title', { onChange: onValuesChange })}
          type="text"
          placeholder="제목"
        />
        <textarea
          {...register('content', { onChange: onValuesChange })}
          placeholder="내용"
        />
        <button type="submit" disabled={!isValid || submitting}>
          {submitting ? '처리 중...' : '추가'}
        </button>
      </div>
    </form>
  );
}
