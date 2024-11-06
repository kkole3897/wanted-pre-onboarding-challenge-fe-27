import { SORT_KEYS } from '../../constants';
import { SortKey } from '../../model';

function formatSortKey(key: SortKey): string {
  switch (key) {
    case SORT_KEYS.CreatedAt:
      return '생성 순';
    case SORT_KEYS.UpdatedAt:
      return '업데이트 순';
    case SORT_KEYS.Title:
      return '제목 순';
    default:
      throw new Error(`지원하지 않는 키: ${key}`);
  }
}

export type SortSelectProps = {
  value: SortKey;
  onValueChange: (value: SortKey) => void;
};

export default function SortSelect({ value, onValueChange }: SortSelectProps) {
  const options = Object.values(SORT_KEYS).map((key) => {
    return {
      value: key,
      label: formatSortKey(key),
    };
  });

  return (
    <select
      name="sortBy"
      value={value}
      onChange={(event) => {
        onValueChange(event.target.value as SortKey);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
