import { User } from '../user/User';
import { getUserOrders, isGetUserOrdersError } from '@/src/infrastructure/api/endpoints/getUserOrders';
import { retex } from 'return-exception';
import { createErrorClass } from 'reasonable-error';
import { ApiOrderMapper } from '../../infrastructure/api/mappers/ApiOrderMapper';

export type FetchUserOrdersParameters = {
  userId: User['id'];
  page: number;
  perPage: number;
};

export const fetchUserOrders = async ({ page, perPage, userId }: FetchUserOrdersParameters) => {
  const [data, error] = await retex(
    () =>
      getUserOrders({
        userId,
        page,
        perPage,
      }),
    [isGetUserOrdersError]
  );

  if (error) {
    throw new FetchUserOrdersError('fetchUserOrders failed unexpectedly!', {
      reason: 'UnexpectedError',
      cause: error,
    });
  }

  const apiOrders = data.data;

  const orders = apiOrders.map(ApiOrderMapper.fromApi);

  return {
    orders,
    meta: data.meta,
  };
};

const { FetchUserOrdersError, isFetchUserOrdersError } = createErrorClass<{
  UnexpectedError: undefined;
}>()('FetchUserOrdersError');

export { isFetchUserOrdersError };
