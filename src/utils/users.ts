// import users from '@mock/small/users.json';
// import orders from '@mock/small/orders.json';
import usersLarge from '@mock/large/users.json';
import ordersLarge from '@mock/large/orders.json';

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

interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export async function getUserById(userId: string): Promise<User | undefined> {
  return (usersLarge as User[]).find((user) => user.id === userId);
}

export async function getOrdersByUserId(
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResult<Order>> {
  const userOrders = (ordersLarge as Order[]).filter((order) => order.user === userId);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedOrders = userOrders.slice(startIndex, endIndex);

  return {
    data: paginatedOrders,
    currentPage: page,
    totalPages: Math.ceil(userOrders.length / limit),
    totalItems: userOrders.length,
  };
}

export async function getTotalSpentByUserId(userId: string): Promise<number> {
  const userOrders = (ordersLarge as Order[]).filter((order) => order.user === userId);
  return userOrders.reduce((total, order) => total + order.total, 0);
}
