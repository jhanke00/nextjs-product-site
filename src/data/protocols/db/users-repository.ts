/* eslint-disable no-unused-vars */
import { IUser } from '@/src/domain/models';

export interface IUserRepository {
  insertMany: (users: IUser[]) => Promise<void>;
}
