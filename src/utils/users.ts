import users from '@mock/small/users.json';
import orders from '@mock/small/orders.json';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: string;
  count: number;
}

interface Order {
  user: string;
  items: OrderItem[];
  total: number;
  time: string;
}

export async function getUserById(userId: string): Promise<User | undefined> {
  return (users as User[]).find((user) => user.id === userId);
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  return (orders as Order[]).filter((order) => order.user === userId);
}

export async function getTotalSpentByUserId(userId: string): Promise<number> {
  const userOrders = await getOrdersByUserId(userId);
  return userOrders.reduce((total, order) => total + order.total, 0);
}
