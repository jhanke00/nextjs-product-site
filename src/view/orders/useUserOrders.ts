import { User } from '@/src/domain/user/User';
import { buildFetchUserOrdersQueryKey } from './buildFetchUserOrdersQueryKey';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryUserOrders } from './queryUserOrders';

export type UseUserOrdersParameters = {
  userId: User['id'];
  page: number;
  perPage: number;
};

export const useUserOrders = ({ page, perPage, userId }: UseUserOrdersParameters) => {
  const queryKey = buildFetchUserOrdersQueryKey({ userId, page, perPage });

  const {
    data: userOrdersResponse,
    status: userOrdersStatus,
    isPlaceholderData: isLoadingUserOrdersNewPage,
  } = useQuery({
    queryKey,
    queryFn: () =>
      queryUserOrders({
        page,
        perPage,
        userId,
      }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  const userOrdersPagination = userOrdersResponse && {
    page: userOrdersResponse.meta.page,
    perPage: userOrdersResponse.meta.perPage,
    numberOfPages: userOrdersResponse.meta.numberOfPages,
    hasPreviousPage: userOrdersResponse.meta.page > 1,
    hasNextPage: userOrdersResponse.meta.page < userOrdersResponse.meta.numberOfPages,
  };

  const orders = userOrdersResponse?.orders;

  return {
    userOrders: orders,
    userOrdersStatus,
    isLoadingUserOrdersNewPage,
    userOrdersPagination,
  };
};
