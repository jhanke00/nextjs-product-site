import { User } from '@/src/domain/user/User';

export const buildFetchUserOrdersSummaryQueryKey = (userId: User['id']) => ['UserOrdersSummary', userId];
