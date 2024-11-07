import { createErrorClass } from 'reasonable-error';
import { User } from '../user/User';
import { OrdersSummary } from './OrdersSummary';
import { getUserOrdersSummary } from '@/src/infrastructure/api/endpoints/getUserOrdersSummary';
import { retex } from 'return-exception';
import { isGetUserOrdersError } from '@/src/infrastructure/api/endpoints/getUserOrders';

export const fetchUserOrdersSummary = async (userId: User['id']): Promise<OrdersSummary> => {
  const [data, error] = await retex(() => getUserOrdersSummary(userId), [isGetUserOrdersError]);

  if (error) {
    throw new FetchUserOrdersSummaryError('fetchUserOrdersSummary failed unexpectedly!', {
      reason: 'UnexpectedError',
      cause: error,
    });
  }

  const apiOrderSummary = data;

  return {
    orderCount: apiOrderSummary.count,
    totalExpenditureInCents: apiOrderSummary.total * 100,
  };
};

const { FetchUserOrdersSummaryError, isFetchUserOrdersSummaryError } = createErrorClass<{
  UnexpectedError: undefined;
}>()('FetchUserOrdersSummaryError');

export { isFetchUserOrdersSummaryError };
