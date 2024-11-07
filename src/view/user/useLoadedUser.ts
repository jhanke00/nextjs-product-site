import { User } from '@/src/domain/user/User';
import { useUser } from './useUser';

export const useLoadedUser = (id: User['id']) => {
  const { user, userStatus } = useUser(id);

  if (userStatus === 'pending') {
    throw new Error(`You should not call this hook if the user is not loaded yet!`);
  }

  return {
    user: user as Exclude<typeof user, undefined>,
    userStatus: userStatus as Exclude<typeof userStatus, 'pending'>,
  };
};
