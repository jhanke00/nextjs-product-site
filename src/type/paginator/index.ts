export type IPaginator = {
  recordsPerPageTitle: string;
  pageSize: number;
  pageSizeChangeHandler: (event: any) => void;
  pageSizes: number[];
  currentPage: number;
  totalPages: number;
  pageChangeHandler: (event: any) => void;
  perPageLabel?: string;
};
