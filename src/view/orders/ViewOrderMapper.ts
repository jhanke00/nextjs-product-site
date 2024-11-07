import { Order } from '@/src/domain/order/Order';
import { ViewOrder } from './ViewOrder';

export const ViewOrderMapper = {
  toView: (order: Order): ViewOrder => {
    return {
      ...order,
      key: crypto.randomUUID(),
    };
  },
  fromView: (viewOrder: ViewOrder): Order => {
    return {
      userId: viewOrder.userId,
      items: viewOrder.items,
      placedAt: viewOrder.placedAt,
      totalInCents: viewOrder.totalInCents,
    };
  },
};
