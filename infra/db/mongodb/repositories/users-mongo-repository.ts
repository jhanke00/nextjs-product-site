import mongoDbConnection from '../helpers/mongo-helper';
import { IUser } from '@/src/domain/models';
import { IUserRepository } from '@/src/data/protocols/db/users-repository';
import User from '../schemas/users-schema';
import { ICreateUserInput } from '@/src/data/protocols/db/dtos/users-repository.dto';

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

  async createUser(data: ICreateUserInput){
    await mongoDbConnection();
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    });

    const savedUser = await newUser.save();
    return savedUser;
  }

}
