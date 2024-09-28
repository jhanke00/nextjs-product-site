import mongoDbConnection from '../helpers/mongo-helper';
import { IUser } from '@/src/domain/models';
import { IUserRepository } from '@/src/data/protocols/db/users-repository';
import User from '../schemas/users-schema';
import { ICreateUserInput } from '@/src/data/protocols/db/dtos/users-repository.dto';
import { v4 as uuidv4 } from 'uuid';

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
      /*
        Note: I choose to set uuid function here, because on relational DB's we can have function that auto generate it,
        and in case of change it will not affect current structure
      */
      _id:  uuidv4(),
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


