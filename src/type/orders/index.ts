export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  user: string;
  items: Array<Item>;
  total: number;
  time: Date;
};

export type TotalSummaryProps = {
  data: Item[];
};

export type UserOrdersProps = {
  params: {
    userId: number;
  };
};

export type SummaryProps = {
  data: Item;
};

export type Users = {
  data: Item[];
};
