import { Order } from '@type/orders';
import orders from '@mock/small/orders.json';
import { getUserById } from '@utils/user/userService';

async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const user = await getUserById(userId);
  const result = orders.filter((order) => order.user === userId);
  return result as unknown as Order[];
}

async function getUserTotalSpent(userId: string): Promise<number> {
  const userOrders = await getOrdersByUserId(userId);
  return userOrders.reduce((acc, order) => acc + order.total, 0);
}

export { getOrdersByUserId, getUserTotalSpent };
