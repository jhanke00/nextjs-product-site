import { apiHttpClient, isHttpError, removeLeadingSlash } from '../apiHttpClient';
import { createErrorClass } from 'reasonable-error';
import { logger } from '@/src/logging/logger';
import { OrdersSummary, OrdersSummarySchema } from '../models/OrdersSummary';
import { retex } from 'return-exception';

export const getUserOrdersSummary = async (userId: string) => {
  const path = removeLeadingSlash(getUserOrdersSummaryPath(userId));

  const [response, httpError] = await retex(() => apiHttpClient.get<OrdersSummary>(path), [isHttpError]);

  if (httpError) {
    const error = new GetUserOrdersSummaryError('getUserOrdersSummary failed unexpectedly!', {
      reason: 'UnexpectedError',
      context: await httpError.response.text(),
    });

    logger.error(error);

    throw error;
  }

  const data = await response.json();

  const { error: validationError } = OrdersSummarySchema.safeParse(data);

  if (validationError) {
    const error = new GetUserOrdersSummaryError('getUserOrdersSummary returned an invalid response!', {
      reason: 'InvalidResponse',
      context: validationError,
    });

    logger.error(error);

    throw error;
  }

  return data;
};

const getUserOrdersSummaryPath = (userId: string) => `/users/${userId}/orders/summary`;

const { GetUserOrdersSummaryError, isGetUserOrdersSummaryError } = createErrorClass<{
  UnexpectedError: unknown;
  InvalidResponse: unknown;
}>()('GetUserOrdersSummaryError');

export { isGetUserOrdersSummaryError };
