import { User } from '../user/User';
import { OrderItem } from './OrderItem';

export type Order = {
  userId: User['id'];
  items: Array<OrderItem>;
  totalInCents: number;
  placedAt: string;
};
