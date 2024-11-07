import { User } from '@/src/domain/user/User';
import { getUser, isGetUserError } from '@/src/infrastructure/api/endpoints/getUser';
import { ApiUserMapper } from '@/src/infrastructure/api/mappers/ApiUserMapper';
import { createErrorClass } from 'reasonable-error';
import { retex } from 'return-exception';

export const fetchUser = async (id: User['id']): Promise<User | undefined> => {
  const [data, error] = await retex(() => getUser(id), [isGetUserError]);

  if (error) {
    // Right now we don't really care why it failed

    throw new FetchUserError(`fetchUser failed unexpectedly!`, {
      reason: 'UnexpectedError',
      cause: error,
    });
  }

  const apiUser = data;

  if (!apiUser) {
    return undefined;
  }

  const user = ApiUserMapper.fromApi(apiUser);

  return user;
};

const { FetchUserError, isFetchUserError } = createErrorClass<{
  UnexpectedError: undefined;
}>()('FetchUserError');

export { isFetchUserError };
