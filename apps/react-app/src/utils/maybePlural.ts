export const maybePlural = (
  count: number,
  word: string,
  suffix = 's',
  irregular = false
): string => {
  const suffixedOrAlt =
    count === 1 ? word : irregular ? suffix : `${word}${suffix}`;
  return `${count} ${suffixedOrAlt}`;
};
