import { User } from '@type/users';

export interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface Order {
  user: User;
  items: Array<Item>;
  total: number;
  time: Date;
}
