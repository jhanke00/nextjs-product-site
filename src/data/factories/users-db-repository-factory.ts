import { UsersMongoRepository } from '@/infra/db/mongodb/repositories/users-mongo-repository';
import { UsersDbRepository } from '../usecases/users-repository';
import BcryptHelper from '@/infra/authenticators/bcrypt/bcrypt-helper';

export const makeUsersDbRepository = () => {
  const mongoUsersRepository = new UsersMongoRepository();
  const bcryptHelper = new BcryptHelper();
  return new UsersDbRepository(mongoUsersRepository,bcryptHelper);
};
