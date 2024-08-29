import { Pagination } from '@type/pagination';

export type CustomResponse<T> = {
  data: T | undefined;
  pagination?: Pagination;
  isLoading: boolean;
  error: Error;
};
