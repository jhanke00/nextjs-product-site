import { getOrdersByUserId, getUserTotalSpent } from './orderService';
import { getUserById } from '@utils/user/userService';
import ordersData from '@mock/small/orders.json';
import type { Order } from '@type/orders';

jest.mock('@utils/user/userService');

describe('getOrdersByUserId', () => {
  const mockOrders: Order[] = ordersData.map((order) => ({
    ...order,
    time: new Date(order.time),
    items: order.items.map((item) => ({
      ...item,
      price: parseFloat(item.price),
    })),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return orders for a given user ID', async () => {
    const userId = 'user1';
    const user = { id: userId, name: 'John Doe' };
    (getUserById as jest.Mock).mockResolvedValue(user);

    const expectedOrders = mockOrders.filter((order) => order.user === userId);

    const result = await getOrdersByUserId(userId);

    expect(getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedOrders);
  });

  it('should return an empty array if the user has no orders', async () => {
    const userId = 'user2';
    const user = { id: userId, name: 'Jane Doe' };
    (getUserById as jest.Mock).mockResolvedValue(user);

    const result = await getOrdersByUserId(userId);

    expect(getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
  });

  it('should throw an error if getUserById fails', async () => {
    const userId = 'user3';
    const errorMessage = 'User not found';
    (getUserById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getOrdersByUserId(userId)).rejects.toThrow(errorMessage);
    expect(getUserById).toHaveBeenCalledWith(userId);
  });
});

describe('getUserTotalSpent', () => {
  const mockOrders: Order[] = ordersData.map((order) => ({
    ...order,
    time: new Date(order.time),
    items: order.items.map((item) => ({
      ...item,
      price: parseFloat(item.price),
    })),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the total amount spent by a user', async () => {
    const userId = 'user1';
    const user = { id: userId, name: 'John Doe' };
    (getUserById as jest.Mock).mockResolvedValue(user);

    const userOrders = mockOrders.filter((order) => order.user === userId);
    const expectedTotal = userOrders.reduce((acc, order) => acc + order.total, 0);

    const result = await getUserTotalSpent(userId);

    expect(getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(expectedTotal);
  });

  it('should return 0 if the user has no orders', async () => {
    const userId = 'user2';
    const user = { id: userId, name: 'Jane Doe' };
    (getUserById as jest.Mock).mockResolvedValue(user);

    const result = await getUserTotalSpent(userId);

    expect(getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(0);
  });

  it('should throw an error if getUserById fails', async () => {
    const userId = 'user3';
    const errorMessage = 'User not found';
    (getUserById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserTotalSpent(userId)).rejects.toThrow(errorMessage);
    expect(getUserById).toHaveBeenCalledWith(userId);
  });
});
