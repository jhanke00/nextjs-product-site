import { useUserOrders, UseUserOrdersParameters } from './useUserOrders';

export const useLoadedUserOrders = (params: UseUserOrdersParameters) => {
  const { isLoadingUserOrdersNewPage, userOrders, userOrdersStatus, userOrdersPagination } = useUserOrders(params);

  if (userOrdersStatus === 'pending') {
    throw new Error(`You should not call this hook if user orders is not loaded yet!`);
  }

  return {
    userOrdersStatus: userOrdersStatus as Exclude<typeof userOrdersStatus, 'pending'>,
    userOrders: userOrders as Exclude<typeof userOrders, undefined>,
    isLoadingUserOrdersNewPage,
    userOrdersPagination: userOrdersPagination as Exclude<typeof userOrdersPagination, undefined>,
  };
};
