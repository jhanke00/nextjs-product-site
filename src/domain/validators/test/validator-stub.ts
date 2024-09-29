import { IValidator } from '@/src/domain/validators/validator';

export const makeValidatorStub = <T>(): jest.Mocked<IValidator<T>> => {
  return {
    validate: jest.fn(),
  } as jest.Mocked<IValidator<T>>;
};
