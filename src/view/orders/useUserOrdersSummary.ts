import { User } from '@/src/domain/user/User';
import { buildFetchUserOrdersSummaryQueryKey } from './buildFetchUserOrdersSummaryQueryKey';
import { useQuery } from '@tanstack/react-query';
import { fetchUserOrdersSummary } from '@/src/domain/order/fetchUserOrdersSummary';

export const useUserOrdersSummary = (userId: User['id']) => {
  const queryKey = buildFetchUserOrdersSummaryQueryKey(userId);

  const { data: ordersSummary, status: ordersSummaryStatus } = useQuery({
    queryKey,
    queryFn: () => fetchUserOrdersSummary(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, //5 minutes
  });

  return {
    ordersSummary,
    ordersSummaryStatus,
  };
};
