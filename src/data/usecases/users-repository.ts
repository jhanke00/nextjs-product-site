import { UsersMongoRepository } from '@/infra/db/mongodb/repositories/users-mongo-repository';
import { ICreateUserInput, IUsersInserManyInput } from '../protocols/db/dtos/users-repository.dto';
import { IPasswordsManager } from '@/src/domain/authenticators/passwords-manager';
import { IUser } from '@/src/domain/models';

export class UsersDbRepository {
  private readonly usersMongoRepository: UsersMongoRepository;
  private readonly passwordsManager: IPasswordsManager;

  constructor(usersMongoRepository: UsersMongoRepository, passwordsManager: IPasswordsManager) {
    this.usersMongoRepository = usersMongoRepository;
    this.passwordsManager = passwordsManager;
  }

  async insertMany(users: IUsersInserManyInput[], batchSize: number = 200): Promise<void> {
    const promises = [];
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);

      /* 
        Note: In my opinion, the PasswordManager should not be here. 
        It's the use case's responsibility to format the data and send it to the repository. 
        However, since this is a migration, and there's no specific use case (service) involved, it's acceptable in this scenario.
      */
      const transformedUsers = await Promise.all(
        batch.map(async (user) => {
          const encodedPassword = await this.passwordsManager.hashPassword(
            this.generateDefaultPassword(user.email, user.phoneNumber)
          );
          return {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: encodedPassword,
          };
        })
      );

      promises.push(this.usersMongoRepository.insertMany(transformedUsers));
    }

    await Promise.all(promises);
    return;
  }

  async findByEmail(email: string): Promise<IUser | null>{
    return await this.usersMongoRepository.getByEmail(email);
  }

  async createUser(data: ICreateUserInput): Promise<IUser>{
    return await this.usersMongoRepository.createUser(data)
  }

  private generateDefaultPassword(email: string, phone: string) {
    const digitsOnly = phone.replace(/\D/g, '');
    const firstThreeNumbers = digitsOnly.split('').slice(0, 3).join('');
    const newPassword = `${email}${firstThreeNumbers}`;

    return newPassword;
  }
}
