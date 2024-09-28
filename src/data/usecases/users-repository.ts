import { UsersMongoRepository } from '@/infra/db/mongodb/repositories/users-mongo-repository';
import { IUsersInserManyInput } from '../protocols/db/dtos/users-repository.dto';

export class UsersDbRepository {
  private readonly usersMongoRepository: UsersMongoRepository;

  constructor(usersMongoRepository: UsersMongoRepository) {
    this.usersMongoRepository = usersMongoRepository;
  }
  async insertMany(users: IUsersInserManyInput[]): Promise<void> {
    const transformedUsers = users.map((user) => ({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    }));
    await this.usersMongoRepository.insertMany(transformedUsers);
  }
}
