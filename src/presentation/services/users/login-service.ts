import { IValidator } from '@/src/domain/validators/validator';
import { badRequest, IHttpResponse, ok } from '../../helpers/http-helpers';
import { UsersDbRepository } from '@/src/data/usecases/users-repository';
import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';
import { IAuthenticator } from '@/src/domain/authenticators/authenticator';

interface ILoginInput {
  email: string,
  password: string
}

export class LoginService {
  private readonly usersDbRepository: UsersDbRepository;
  private readonly validator: IValidator<ILoginInput>;
  private readonly passwordsManager: IPasswordsManager;
  private readonly authenticator: IAuthenticator;

  constructor(
    usersDbRepository: UsersDbRepository,
    validator: IValidator<ILoginInput>,
    passwordsManager: IPasswordsManager,
    authenticator: IAuthenticator
  ) {
    this.usersDbRepository = usersDbRepository;
    this.validator = validator;
    this.passwordsManager = passwordsManager;
    this.authenticator = authenticator;
  }
  async exec({ email, password }: ILoginInput): Promise<IHttpResponse> {
    const isValid = this.validator.validate({ email, password });
    if (!isValid) {
      return badRequest(new Error('Invalid email or password.'));
    }

    const user = await this.usersDbRepository.findByEmail(email);
    if (!user) {
      return badRequest(new Error('User not found.'));
    }

    const isPasswordCorrect = await this.passwordsManager.comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      return badRequest(new Error('Incorrect password.'));
    }

    const accessToken = await this.authenticator.createNewToken(user);

    return ok({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      accessToken,
    });
  }
}
