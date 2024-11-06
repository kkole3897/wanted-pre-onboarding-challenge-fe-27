export function sorted<T>(given: T[], compare?: (a: T, b: T) => number): T[] {
  const copied = [...given];

  copied.sort(compare);

  return copied;
}
