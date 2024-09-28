import { IUser } from '@/src/domain/models';

export interface IUsersInserManyInput {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}


export type ICreateUserInput = Omit<IUser, '_id'>;