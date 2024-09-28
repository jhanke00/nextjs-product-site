import { IValidator } from '@/src/domain/validators/validator';

export const makeValidatorStub = (): IValidator<{ id: string }> => {
  return {
    validate: jest.fn(),
  };
};