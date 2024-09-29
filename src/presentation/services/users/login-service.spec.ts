import { LoginService } from './login-service'; // caminho para o seu arquivo
import { badRequest, ok } from '../../helpers/http-helpers';
import { makeUsersDbRepositoryStub } from '@/src/data/usecases/tests/users-repository-stub';
import { makeValidatorStub } from '@/src/domain/validators/test/validator-stub';
import { makePasswordsManagerStub } from '@/src/domain/authenticators/tests/password-manager-stub';
import { makeAuthenticatorStub } from '@/src/domain/authenticators/tests/authenticator-stub';
import { ILoginInput } from '@/src/presentation/services/users/login-service';

const makeSut = () => {
  const usersDbRepositoryStub = makeUsersDbRepositoryStub();
  const validatorStub = makeValidatorStub<ILoginInput>();
  const passwordsManagerStub = makePasswordsManagerStub();
  const authenticatorStub = makeAuthenticatorStub();

  const sut = new LoginService(usersDbRepositoryStub, validatorStub, passwordsManagerStub, authenticatorStub);

  return { sut, usersDbRepositoryStub, validatorStub, passwordsManagerStub, authenticatorStub };
};

const mockedUserData = {
  _id: 'any',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '123456789',
  email: 'valid@test.com',
  password: 'hashed_password',
};

const mockedLoginInput = { email: 'valid@test.com', password: 'wrong_password' };

describe('LoginService', () => {
  it('should return error if validation fails', async () => {
    const { sut, validatorStub } = makeSut();
    const mockedInvalidUser = { email: 'notfound@test.com', password: '123456' };

    validatorStub.validate.mockReturnValueOnce({
      isValid: false,
      output: mockedInvalidUser,
    });

    const response = await sut.exec({ email: 'invalid@test.com', password: '123456' });

    expect(response.body['message']).toEqual('Invalid email or password.');
  });

  it('should return error if user not found', async () => {
    const { sut, validatorStub, usersDbRepositoryStub } = makeSut();
    const mockedNotFoundUser = { email: 'notfound@test.com', password: '123456' };

    validatorStub.validate.mockReturnValueOnce({
      isValid: true,
      output: mockedNotFoundUser,
    });
    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce(null);

    const response = await sut.exec(mockedNotFoundUser);

    expect(response.body['message']).toEqual('Invalid email or password.');
  });

  it('should return error if password is incorrect', async () => {
    const { sut, validatorStub, usersDbRepositoryStub, passwordsManagerStub } = makeSut();
    validatorStub.validate.mockReturnValueOnce({
      isValid: true,
      output: mockedLoginInput,
    });
    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce(mockedUserData);
    passwordsManagerStub.comparePasswords.mockResolvedValueOnce(false);

    const response = await sut.exec(mockedLoginInput);

    expect(response.body['message']).toEqual('Invalid email or password.');
  });

  it('should return success and a token on successful login', async () => {
    const { sut, validatorStub, usersDbRepositoryStub, passwordsManagerStub, authenticatorStub } = makeSut();
    validatorStub.validate.mockReturnValueOnce({
      isValid: true,
      output: mockedLoginInput,
    });
    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce(mockedUserData);
    passwordsManagerStub.comparePasswords.mockResolvedValueOnce(true);
    authenticatorStub.createNewToken.mockResolvedValueOnce('valid_token');

    const response = await sut.exec(mockedLoginInput);

    expect(response).toEqual(
      ok({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123456789',
        email: 'valid@test.com',
        accessToken: 'valid_token',
      })
    );
  });
});
