import { User as ApiUser, User } from '@/src/infrastructure/api/models/User';

export const ApiUserMapper = {
  fromApi: (apiUser: ApiUser): User => {
    return {
      id: apiUser.id,
      email: apiUser.email,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      phoneNumber: apiUser.phoneNumber,
    };
  },
  toApi: (user: User): ApiUser => {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    };
  },
};
