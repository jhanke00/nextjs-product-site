import { User } from '@/src/domain/user/User';

export const buildFetchUserQueryKey = (userId: User['id']) => ['Users', userId];
