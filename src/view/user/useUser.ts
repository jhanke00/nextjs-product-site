import { User } from '@/src/domain/user/User';
import { useQuery } from '@tanstack/react-query';
import { buildFetchUserQueryKey } from './buildFetchUserQueryKey';
import { fetchUser } from '@/src/domain/user/fetchUser';

export const useUser = (id: User['id']) => {
  const queryKey = buildFetchUserQueryKey(id);

  const { data: user, status: userStatus } = useQuery({
    queryKey,
    queryFn: async () => {
      const user = await fetchUser(id);

      if (!user) {
        // Tan Stack Query does not play nice
        // with undefined
        return null;
      }

      return user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    refetchInterval: 1000 * 60 * 5, // 5 minutes,
  });

  return {
    user,
    userStatus,
  };
};
