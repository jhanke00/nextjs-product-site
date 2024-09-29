import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';

export const makePasswordsManagerStub = (): jest.Mocked<IPasswordsManager> => {
  return {
    comparePasswords: jest.fn(),
    hashPassword: jest.fn(),
  } as jest.Mocked<IPasswordsManager>;
};
