import { FindUserByEmailService } from './find-user-by-email-service';
import { makeUsersDbRepositoryStub } from '@/src/data/usecases/tests/users-repository-stub';
import { ok } from '../../helpers/http-helpers';
import { IUser } from '@/src/domain/models';

const makeSut = () => {
  const usersDbRepositoryStub = makeUsersDbRepositoryStub();
  const sut = new FindUserByEmailService(usersDbRepositoryStub);

  return { sut, usersDbRepositoryStub };
};

const mockedUserData = {
  _id: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '123456789',
  email: 'johndoe@example.com',
} as IUser;

describe('FindUserByEmailService', () => {
  it('should return user data if the email is found', async () => {
    const { sut, usersDbRepositoryStub } = makeSut();

    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce(mockedUserData);

    const response = await sut.exec('johndoe@example.com');

    expect(usersDbRepositoryStub.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(response).toEqual(
      ok({
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123456789',
        email: 'johndoe@example.com',
      })
    );
  });

  it('should return an ok response with undefined data if the email is not found', async () => {
    const { sut, usersDbRepositoryStub } = makeSut();

    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce(null);

    const response = await sut.exec('unknown@example.com');

    expect(usersDbRepositoryStub.findByEmail).toHaveBeenCalledWith('unknown@example.com');
    expect(response).toEqual(
      ok({
        _id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      })
    );
  });
});
