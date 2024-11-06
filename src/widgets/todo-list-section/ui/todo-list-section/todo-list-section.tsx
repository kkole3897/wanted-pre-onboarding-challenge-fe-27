import {
  useQueryContext,
  SortSelect,
  OrderSelect,
} from '@/features/query-todos';

type TodoListSectionProps = {
  children?: React.ReactNode;
};

export default function TodoListSection({ children }: TodoListSectionProps) {
  const { query, handleChangeQuery } = useQueryContext();

  return (
    <section>
      <div>
        <SortSelect
          value={query.sortBy}
          onValueChange={(value) => {
            handleChangeQuery({ ...query, sortBy: value });
          }}
        />
        <OrderSelect
          value={query.order}
          onValueChange={(value) =>
            handleChangeQuery({ ...query, order: value })
          }
        />
      </div>
      {children}
    </section>
  );
}
