import { IAuthenticator } from '@/src/domain/authenticators/authenticator';

export const makeAuthenticatorStub = (): jest.Mocked<IAuthenticator> => {
  return {
    createNewToken: jest.fn(),
  } as unknown as jest.Mocked<IAuthenticator>;
};
