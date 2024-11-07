import { Order } from '@/src/domain/order/Order';

export type ViewOrder = Order & {
  key: string;
};
