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

export type OrderProps = {
  data: Order;
  index: number;
};
