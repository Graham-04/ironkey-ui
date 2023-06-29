export const convertToShortForm = (num: number) => {
  const suffixes = ["", "k", "M", "B"];
  let suffixIndex = 0;

  while (num >= 1000 && suffixIndex < suffixes.length) {
    num /= 1000;
    suffixIndex++;
  }

  return num + suffixes[suffixIndex];
};