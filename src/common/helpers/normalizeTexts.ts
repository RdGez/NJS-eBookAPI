export const normalizeText = (fileName: string) => {
  return fileName
    .trim()
    .normalize('NFD')
    .replace(/[^\w\s]/gi, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ /g, '_')
    .toLowerCase();
};
