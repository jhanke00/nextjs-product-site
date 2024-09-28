import { UsersMongoRepository } from '@/infra/db/mongodb/repositories/users-mongo-repository';
import { UsersDbRepository } from '../usecases/users-repository';

export const makeUsersDbRepository = () => {
  const mongoUsersRepository = new UsersMongoRepository();
  return new UsersDbRepository(mongoUsersRepository);
};
