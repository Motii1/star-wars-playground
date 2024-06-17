export const parsePostgresEnumArray = <EnumItem>(value: string): EnumItem[] => {
  const valueWithoutBrackets = value.substring(1, value.length - 1);
  return valueWithoutBrackets.split(',') as EnumItem[];
};
