import { z } from 'zod';
import { apiHttpClient, isHttpError, removeLeadingSlash } from '../apiHttpClient';
import { OrderSchema } from '../models/Order';
import { User } from '../models/User';
import { logger } from '@/src/logging/logger';
import { createErrorClass } from 'reasonable-error';
import { retex } from 'return-exception';

export type GetUserOrdersParameters = {
  userId: string;
  page?: number;
  perPage?: number;
};

export const getUserOrders = async ({ userId, page = 1, perPage = 10 }: GetUserOrdersParameters) => {
  const path = removeLeadingSlash(getUserOrdersPath(userId));
  const pathWithParams = `${path}?page=${page}&perPage=${perPage}`;

  const [response, httpError] = await retex(
    () => apiHttpClient.get<GetUserOrdersResponseData>(pathWithParams),
    [isHttpError]
  );

  if (httpError) {
    const error = new GetUserOrdersError('getUserOrders failed for an unknown reason!', {
      reason: 'UnexpectedError',
      context: await httpError.response.text(),
    });

    logger.error(error);

    throw error;
  }

  const data = await response.json();

  const { error: validationError } = GetUserOrdersResponseDataSchema.safeParse(data);

  if (validationError) {
    const error = new GetUserOrdersError('getUserOrders returned an invalid response!', {
      reason: 'InvalidResponse',
      context: validationError,
    });

    logger.error(error);

    throw error;
  }

  return data;
};

export const getUserOrdersPath = (userId: User['id']) => `/users/${userId}/orders`;

export type GetUserOrdersResponseData = z.infer<typeof GetUserOrdersResponseDataSchema>;

const GetUserOrdersResponseDataSchema = z.object({
  data: z.array(OrderSchema),
  meta: z.object({
    page: z.number().positive(),
    perPage: z.number().positive(),
    numberOfPages: z.number().positive(),
  }),
});

const { GetUserOrdersError, isGetUserOrdersError } = createErrorClass<{
  UnexpectedError: unknown;
  InvalidResponse: unknown;
}>()('GetUserOrdersError');

export { isGetUserOrdersError };
