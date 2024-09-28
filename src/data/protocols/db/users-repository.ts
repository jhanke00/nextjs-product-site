/* eslint-disable no-unused-vars */
import { IUser } from '@/src/domain/models';
import { ICreateUserInput } from './dtos/users-repository.dto';

export interface IUserRepository {
  insertMany: (users: IUser[]) => Promise<void>;
  getByEmail: (email:string) => Promise<IUser>;
  createUser: (data: ICreateUserInput) => Promise<IUser>;
}
