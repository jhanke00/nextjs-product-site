
import { IValidator } from '@/src/domain/validators/validator';
import { UsersDbRepository } from '@/src/data/usecases/users-repository';
import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';
import { IAuthenticator } from '@/src/domain/authenticators/authenticator';
import { badRequest, ok } from '../../helpers/http-helpers';
import { ICreateUserInput } from '@/src/data/protocols/db/dtos/users-repository.dto';
import { makeValidatorStub } from '@/src/domain/validators/test/validator-stub';
import { makeUsersDbRepositoryStub } from '@/src/data/usecases/tests/users-repository-stub';
import { makeAuthenticatorStub } from '@/src/domain/authenticators/tests/authenticator-stub';
import { makePasswordsManagerStub } from '@/src/domain/authenticators/tests/password-manager-stub';
import { SignupService } from './sign-up-service';
import { IUser } from '@/src/domain/models';

const makeSut = () => {
  const usersDbRepositoryStub = makeUsersDbRepositoryStub();
  const validatorStub = makeValidatorStub<ICreateUserInput & { confirmPassword: string }>();
  const passwordsManagerStub = makePasswordsManagerStub();
  const authenticatorStub = makeAuthenticatorStub();
  const sut = new SignupService(usersDbRepositoryStub, validatorStub, passwordsManagerStub, authenticatorStub);
  
  return { sut, usersDbRepositoryStub, validatorStub, passwordsManagerStub, authenticatorStub };
};

describe('SignupService', () => {
  it('should return error if validation fails', async () => {
    const { sut, validatorStub } = makeSut();
    const input = { 
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com', 
      password: '123456', 
      confirmPassword: '123456' 
    };
    validatorStub.validate.mockReturnValueOnce({ isValid: false, output: input });

    const response = await sut.exec(input);

    expect(response.body['message']).toEqual('Check if all fields are filled correctly and password is greater than 6 characters');
  });

  it('should return error if user already exists', async () => {
    const { sut, usersDbRepositoryStub, validatorStub } = makeSut();
    const input = { 
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com', 
      password: 'password1', 
      confirmPassword: 'password1' 
    };
    validatorStub.validate.mockReturnValueOnce({ isValid: true, output: input });
    usersDbRepositoryStub.findByEmail.mockResolvedValueOnce({ email: 'existing_user_id' } as IUser);

    const response = await sut.exec(input);

    expect(response.body['message']).toEqual('User already exists');
  });

  it('should return error if password and confirmPassword do not match', async () => {
    const { sut, validatorStub } = makeSut();
    const input = { 
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com', 
      password: 'password1', 
      confirmPassword: 'password2' 
    };
    validatorStub.validate.mockReturnValueOnce({ isValid: true, output: input });

    const response = await sut.exec(input);

    expect(response.body['message']).toEqual(`Passwords doesn't match`);
  });

  it('should hash the password and create a user successfully', async () => {
    const { sut, validatorStub, usersDbRepositoryStub, passwordsManagerStub, authenticatorStub } = makeSut();
    const input = { 
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com', 
      password: 'password1', 
      confirmPassword: 'password1' 
    };
    validatorStub.validate.mockReturnValueOnce({ isValid: true, output: input });
    passwordsManagerStub.hashPassword.mockResolvedValueOnce('hashed_password');
    usersDbRepositoryStub.createUser.mockResolvedValueOnce({
      _id: 'any_id',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com',
      password: 'any_password'
    });
    authenticatorStub.createNewToken.mockResolvedValueOnce('valid_token');

    const response = await sut.exec(input);
    
    expect(response).toEqual(ok({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      email: 'test@test.com',
      accessToken: 'valid_token',
    }));
  });
});
