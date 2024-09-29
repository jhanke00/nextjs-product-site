import { IValidator } from '@/src/domain/validators/validator';
import { badRequest, IHttpResponse, ok } from '../../helpers/http-helpers';
import { UsersDbRepository } from '@/src/data/usecases/users-repository';
import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';
import { IAuthenticator } from '@/src/domain/authenticators/authenticator';
import { ICreateUserInput } from '@/src/data/protocols/db/dtos/users-repository.dto';

export class SignupService {
  private readonly usersDbRepository: UsersDbRepository;
  private readonly validator: IValidator<ICreateUserInput & { confirmPassword: string }>;
  private readonly passwordsManager: IPasswordsManager;
  private readonly authenticator: IAuthenticator;

  constructor(
    usersDbRepository: UsersDbRepository,
    validator: IValidator<ICreateUserInput & { confirmPassword: string }>,
    passwordsManager: IPasswordsManager,
    authenticator: IAuthenticator
  ) {
    this.usersDbRepository = usersDbRepository;
    this.validator = validator;
    this.passwordsManager = passwordsManager;
    this.authenticator = authenticator;
  }
  async exec(data: ICreateUserInput & { confirmPassword: string }): Promise<IHttpResponse> {
    const { isValid, output } = this.validator.validate(data);
    if (!isValid) {
      return badRequest(
        new Error('Check if all fields are filled correctly and password is greater than 6 characters')
      );
    }

    const user = await this.usersDbRepository.findByEmail(output.email);

    if (user) {
      return badRequest(new Error('User already exists'));
    }

    if (output.password !== output.confirmPassword) {
      return badRequest(new Error('Passwords doesn\'t match'));
    }

    const hashedToken = await this.passwordsManager.hashPassword(output.password);
    const formattedData = {
      ...output,
      password: hashedToken,
    };
    const newUser = await this.usersDbRepository.createUser(formattedData);
    const accessToken = await this.authenticator.createNewToken(newUser);

    return ok({
      firstName: output.firstName,
      lastName: output.lastName,
      phoneNumber: output.phoneNumber,
      email: output.email,
      accessToken,
    });
  }
}
