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

export default function SortSelect() {
  const options = Object.values(SORT_KEYS).map((key) => {
    return {
      value: key,
      label: formatSortKey(key),
    };
  });

  return (
    <select name="sortBy">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
