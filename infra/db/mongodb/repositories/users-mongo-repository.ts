import mongoDbConnection from '../helpers/mongo-helper';
import { IUser } from '@/src/domain/models';
import { IUserRepository } from '@/src/data/protocols/db/users-repository';
import User from '../schemas/users-schema';

export class UsersMongoRepository implements IUserRepository {
  async insertMany(users: IUser[]) {
    await mongoDbConnection();
    await User.insertMany(users);

    return;
  }
  async getByEmail(email: string) {
    await mongoDbConnection();
    const user = await User.findOne({ email });

    return user;
  }

}
