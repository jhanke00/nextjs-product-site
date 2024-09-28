import BcryptHelper from '@/infra/authenticators/bcrypt/bcrypt-helper';
import JwtHelper from '@/infra/authenticators/jwt/jwt-helper';
import { SchemaValidator } from '@/infra/validators/schema-validator';
import { SignUpSchema } from '@/infra/validators/schemas';
import { makeUsersDbRepository } from '@/src/data/factories';
import { ICreateUserInput } from '@/src/data/protocols/db/dtos/users-repository.dto';
import { SignupService } from '@/src/presentation/services/users/sign-up-service';

export const makeSignUpService = () => {
  const jwtHelper = new JwtHelper();
  const bcryptHelper = new BcryptHelper();
  const validator = new SchemaValidator<ICreateUserInput & { confirmPassword: string; }>(SignUpSchema);
  const usersDbRepository = makeUsersDbRepository();
  const signupService = new SignupService(usersDbRepository,validator,bcryptHelper, jwtHelper);

  return signupService;
};
  