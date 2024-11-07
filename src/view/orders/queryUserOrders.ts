import { fetchUserOrders, FetchUserOrdersParameters } from '@/src/domain/order/fetchUserOrders';
import { ViewOrderMapper } from './ViewOrderMapper';

export type QueryUserOrdersParameters = FetchUserOrdersParameters;

export const queryUserOrders = async ({ page, perPage, userId }: QueryUserOrdersParameters) => {
  const response = await fetchUserOrders({ page, perPage, userId });

  return {
    orders: response.orders.map(ViewOrderMapper.toView),
    meta: response.meta,
  };
};
