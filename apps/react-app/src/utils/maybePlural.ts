export const maybePlural = (
  count: number,
  word: string,
  suffix = 's',
  alt = false
): string => {
  const suffixedOrAlt = count === 1 ? word : alt ? suffix : `${word}${suffix}`;
  return `${count} ${suffixedOrAlt}`;
};
