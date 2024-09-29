import { makeUsersDbRepository } from '@/src/data/factories';
import { FindUserByEmailService } from '@/src/presentation/services/users/find-user-by-email-service';

export const makeFindUserByEmailService = () => {
  const usersDbRepository = makeUsersDbRepository();
  const findUserByEmailService = new FindUserByEmailService(usersDbRepository);

  return findUserByEmailService;
};
