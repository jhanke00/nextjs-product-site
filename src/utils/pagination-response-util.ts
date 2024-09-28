export function paginateResponse<T>(
  data: { result: T; total: number },
  page = 1,
  limit = 20,
) {
  const { result, total } = data;
  limit = Number(limit);
  page = Number(page);
  const lastPage = Math.ceil(total / limit);
  return {
    total,
    currentPage: page,
    lastPage, 
    data: result,
  };
}
