import { User } from '@/src/domain/user/User';

export const formatUserName = (user: User) => `${user.firstName} ${user.lastName}`;
