import { UsersDbRepository } from '../users-repository';

export const makeUsersDbRepositoryStub = (): jest.Mocked<UsersDbRepository> => {
  return {
    findByEmail: jest.fn(),
    insertMany: jest.fn(),
    createUser: jest.fn()
  } as unknown as jest.Mocked<UsersDbRepository>;
};
