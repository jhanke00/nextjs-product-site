import { PageProps } from '@/pages/users/[userId]';
import { fetchUserOrdersSummary } from '@/src/domain/order/fetchUserOrdersSummary';
import { fetchUser } from '@/src/domain/user/fetchUser';
import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { buildFetchUserQueryKey } from '../../user/buildFetchUserQueryKey';
import { parseUserOrdersPageQueryParams } from './parseUserOrdersPageQueryParams';
import { buildFetchUserOrdersQueryKey } from '../../orders/buildFetchUserOrdersQueryKey';
import { buildFetchUserOrdersSummaryQueryKey } from '../../orders/buildFetchUserOrdersSummaryQueryKey';
import { queryUserOrders } from '../../orders/queryUserOrders';
import { createQueryClient } from '../../query/createQueryClient';

type UserPagePathParams = {
  userId: string;
};

export const getUsersPageServerSideProps: GetServerSideProps<PageProps, UserPagePathParams> = async (context) => {
  const { params, query } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { userId } = params;

  const { page, perPage } = parseUserOrdersPageQueryParams(query);

  const queryClient = createQueryClient();

  // We're calling `fetchQuery` instead of `prefetchQuery`
  // because we both want the data in some cases
  // but also we want this to throw if anything goes wrong
  // as there is no sensible way to display this page
  // without any of the info
  const prefetchUser = () =>
    queryClient.fetchQuery({
      queryKey: buildFetchUserQueryKey(userId),
      queryFn: () => fetchUser(userId),
    });

  const prefetchUserOrders = () =>
    queryClient.fetchQuery({
      queryKey: buildFetchUserOrdersQueryKey({ userId, page, perPage }),
      queryFn: () => queryUserOrders({ page, perPage, userId }),
    });

  // For this one, if it fails, we'll still continue
  // as it doesn't impact UX as much as the previous ones
  const prefetchUserOrdersSummary = () =>
    queryClient.prefetchQuery({
      queryKey: buildFetchUserOrdersSummaryQueryKey(userId),
      queryFn: () => fetchUserOrdersSummary(userId),
    });

  const user = await prefetchUser();

  if (!user) {
    return {
      notFound: true,
    };
  }

  await Promise.all([prefetchUserOrders(), prefetchUserOrdersSummary()]);

  return {
    props: { dehydratedState: dehydrate(queryClient), userId, page, perPage },
  };
};
