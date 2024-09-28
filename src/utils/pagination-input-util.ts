export interface IPaginationInputUtil {
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