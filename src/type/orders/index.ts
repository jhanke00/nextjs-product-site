export type Item = {
  id: string;
  name: string;
  price: number;
  count: number;
};

export type Order = {
  user: string;
  items: Array<Item>;
  total: number;
  time: Date;
};

export type ButtonType = {
  disable: boolean;
  className: string;
  buttonText: string;
  handleClick: () => void;
};

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
};
