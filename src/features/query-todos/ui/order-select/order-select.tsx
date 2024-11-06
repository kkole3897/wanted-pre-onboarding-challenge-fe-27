import { OrderKey } from '../../model';
import { ORDER_KEYS } from '../../constants';

function formatOrderKey(key: OrderKey): string {
  switch (key) {
    case ORDER_KEYS.Asc:
      return '오름차순';
    case ORDER_KEYS.Desc:
      return '내림차순';
    default:
      throw new Error(`지원하지 않는 키: ${key}`);
  }
}

type OrderSelectProps = {
  value: OrderKey;
  onValueChange: (value: OrderKey) => void;
};

export default function OrderSelect({
  value,
  onValueChange,
}: OrderSelectProps) {
  const options = Object.values(ORDER_KEYS).map((key) => {
    return {
      value: key,
      label: formatOrderKey(key),
    };
  });

  return (
    <select
      name="orderBy"
      value={value}
      onChange={(event) => {
        onValueChange(event.target.value as OrderKey);
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
