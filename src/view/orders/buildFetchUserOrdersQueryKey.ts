import { User } from '@/src/domain/user/User';

export type BuildFetchUserOrdersQueryKeyParameters = {
  userId: User['id'];
  page?: number;
  perPage?: number;
};

export const buildFetchUserOrdersQueryKey = ({ userId, page, perPage }: BuildFetchUserOrdersQueryKeyParameters) => [
  'UserOrders',
  userId,
  page,
  perPage,
];
