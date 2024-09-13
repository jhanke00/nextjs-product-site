import { User } from '@/src/type/users';

export type Item = {
  id: string;
  name: string;
  price: string;
  count: number;
};

export type Order = {
  user: string;
  items: Array<Item>;
  total: number;
  time: string;
};

export type UserOrdersPageProps = {
  orders: Order[];
  totalSpent: number;
  user: User;
};
