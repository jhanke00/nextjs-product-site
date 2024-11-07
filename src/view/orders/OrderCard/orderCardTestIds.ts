import { Order } from '@/src/domain/order/Order';

export const orderCardTestIds = (() => {
  const baseSegment = 'OrderCard';

  // Because Order does not have any id
  // we have to try to generate our own in
  // a way that's least likely to collide with other
  const containerId = (order: Order) => `${baseSegment}-${order.placedAt}-${order.totalInCents}-${order.items.length}`;

  return {
    containerId,
  };
})();
