export const formatDateTime = (isoDate: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));

export const includesQuery = (values: string[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return values.some((value) => value.toLowerCase().includes(normalizedQuery));
};

export const getPageWindow = (currentPage: number, totalPages: number) => {
  const safeTotal = Math.max(totalPages, 1);
  const start = Math.max(1, Math.min(currentPage - 2, safeTotal - 4));
  const end = Math.min(safeTotal, start + 4);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const splitFullName = (fullName: string) => {
  const [name, ...surnameParts] = fullName.split(' ');

  return {
    name,
    surname: surnameParts.join(' ') || '—',
  };
};
