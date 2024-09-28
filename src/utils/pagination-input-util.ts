export interface IPaginationInputUtil{
    page?: string;
    limit?: string;

}
  
export class PaginationInputUtil {
  readonly page?: number;
  readonly limit?: number;
  readonly skip?: number;
  
  constructor(data?: IPaginationInputUtil) {
    this.page = Number(data?.page) || 1;
    this.limit = Number(data?.limit) || 20;
    this.skip = (this.page - 1) * this.limit;
  }
}


export function paginateResponse<T>(
  data: { result: T; total: number },
  page = 1,
  limit = 10,
) {
  const { result, total } = data;
  limit = Number(limit);
  page = Number(page);
  const lastPage = Math.ceil(total / limit);
  return {
    total,
    totalRecords: total,
    lastPage: lastPage,
    currentPage: page,
    firstPage: 1,
    data: result,
  };
}
  