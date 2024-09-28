import BcryptHelper from '@/infra/authenticators/bcrypt/bcrypt-helper';
import JwtHelper from '@/infra/authenticators/jwt/jwt-helper';
import { SchemaValidator } from '@/infra/validators/schema-validator';
import { LoginSchema } from '@/infra/validators/schemas';
import { makeUsersDbRepository } from '@/src/data/factories';
import { LoginService } from '@/src/presentation/services/users/login-service';

export const loginService = () => {
  const jwtHelper = new JwtHelper();
  const bcryptHelper = new BcryptHelper();
  const validator = new SchemaValidator(LoginSchema);
  const usersDbRepository = makeUsersDbRepository();
  const loginService = new LoginService(usersDbRepository,validator,bcryptHelper, jwtHelper);

  return loginService;
};
  