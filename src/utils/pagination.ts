interface PaginationOptions {
  page: number;
  limit: number;
}

export function paginate<T>(items: T[], options: PaginationOptions): T[] {
  const { page, limit } = options;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return items.slice(startIndex, endIndex);
}
