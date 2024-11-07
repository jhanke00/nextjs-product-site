import { Order as ApiOrder } from '@/src/infrastructure/api/models/Order';
import { Order } from '../../../domain/order/Order';

export const ApiOrderMapper = {
  fromApi: (apiOrder: ApiOrder): Order => {
    return {
      userId: apiOrder.user,
      placedAt: apiOrder.time,
      totalInCents: apiOrder.total,
      items: apiOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        priceInCents: parseFloat(item.price) * 100,
        count: item.count,
      })),
    };
  },
};
