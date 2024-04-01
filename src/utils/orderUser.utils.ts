import { Order } from '@/src/type/orders/index';
import { User } from '@/src/type/users/index';

export const combineItemsOfDuplicateUsers = (data: Order[]): Order[] => {
  const combinedItems: Order[] = data.reduce((previousValue: any, currentValue: Order) => {
    const items = currentValue.items.map((obj) => {
      return {
        ...obj,
        time: currentValue.time,
      };
    });
    if (previousValue[currentValue.user]) {
      previousValue[currentValue.user].items = [...previousValue[currentValue.user].items, ...items];
      previousValue[currentValue.user].total = previousValue[currentValue.user].total + currentValue.total;
    } else {
      previousValue[currentValue.user] = { ...currentValue, items: [...items] };
    }
    return previousValue;
  }, {});

  const result = Object.values(combinedItems);
  return result;
};

export const getUserName = (userData: User[], userId: string) => {
  const userDetails = userData.find((user: User) => user.id == userId);
  return userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : '';
};

export const formatDate = (date: string | Date): string => {
  try {
    if (date) {
      const formattedDate = new Date(date).toLocaleString();
      return formattedDate;
    }
    return '';
  } catch {
    return '';
  }
};
