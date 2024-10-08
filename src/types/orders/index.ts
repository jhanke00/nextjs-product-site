export type IItem = {
  _id: string;
  name: string;
  price: number;
  count: number;
};

export type IOrder = {
  _id: string;
  user: string;
  items: Array<IItem>;
  total: number;
  time: Date;
};

export type IItemSmall = {
  id: string;
  name: string;
  price: number;
  count: number;
};

export type IOrderSmall = {
  user: string;
  items: Array<IItemSmall>;
  total: number;
  time: Date;
};
