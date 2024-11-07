import { createErrorClass } from 'reasonable-error';
import { apiHttpClient, isHttpError, removeLeadingSlash } from '../apiHttpClient';
import { User, UserSchema } from '../models/User';
import { logger } from '@/src/logging/logger';
import { retex } from 'return-exception';
import { z } from 'zod';

export const getUser = async (id: string) => {
  const path = removeLeadingSlash(getUserPath(id));

  const [response, httpError] = await retex(() => apiHttpClient.get<User | null>(path), [isHttpError]);

  if (httpError) {
    const error = new GetUserError('getUser failed with unknown reason!', {
      reason: 'UnexpectedError',
    });

    logger.error(error, { text: await httpError.response.text() });

    throw error;
  }

  const data = await response.json();

  const { error: validationError } = GetUserResponseDataSchema.safeParse(data);

  if (validationError) {
    const error = new GetUserError(`getUser failed due to invalid response!`, {
      reason: 'InvalidResponse',
      context: validationError,
    });

    logger.error(error);

    throw error;
  }

  return data;
};

export const getUserPath = (id: string) => `/users/${id}`;

const { GetUserError, isGetUserError } = createErrorClass<{
  InvalidResponse: unknown;
  UnexpectedError: undefined;
}>()('GetUserError');

export { isGetUserError };

export type GetUserResponseData = z.infer<typeof GetUserResponseDataSchema>;

const GetUserResponseDataSchema = UserSchema.nullable();
