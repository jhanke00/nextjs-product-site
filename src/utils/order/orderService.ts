import orders from '@mock/small/orders.json';
import { getUserById } from '@utils/user/userService';
import { ValidationError } from '../apiErrors';
import type { Order } from '@type/orders';

async function getOrdersByUserId(userId: string): Promise<Order[]> {
  if (!userId) return [];
  const user = await getUserById(userId);
  const result = orders.filter((order) => order.user === user.id);
  return result as unknown as Order[];
}

async function getUserTotalSpent(userId: string): Promise<number> {
  if (!userId) throw new ValidationError('User id is required');
  const userOrders = await getOrdersByUserId(userId);
  return userOrders.reduce((acc, order) => acc + order.total, 0);
}

export { getOrdersByUserId, getUserTotalSpent };
