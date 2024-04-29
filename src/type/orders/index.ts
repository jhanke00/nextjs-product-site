export type Item = {
  _id: string;
  count: number;
};

export type Order = {
  _id: string;
  user: string;
  items: Array<Item>;
  total: number;
  time: Date;
};
