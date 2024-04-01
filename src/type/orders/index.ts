export type Item = {
  id: string;
  name: string;
  price: number;
  count: number;
  time?: Date;
};

export type Order = {
  user: string;
  items: Array<Item>;
  total: number;
  time: Date;
};

export type IOrderTable = {
  order: Order;
};
