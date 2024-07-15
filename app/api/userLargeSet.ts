import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import { UserInfo } from '../../src/type/users/index.ts';
import { Order } from '../../src/type/orders/index.ts';
import { paginate } from '../../src/utils/pagination.ts';
const usersFilePath = './src/mock/large/users.json';
const ordersFilePath = './src/mock/large/orders.json';

let usersMap: Map<string, UserInfo> = new Map(); // In-memory user data

export async function userRoutesLarge(app: express.Application) {
  // Function to load user data from the file and populate the Map
  async function loadUsersData(): Promise<void> {
    if (usersMap.size === 0) {
      // Check if data already loaded
      try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        const users = JSON.parse(data) as UserInfo[];
        users.forEach((user) => usersMap.set(user.id, user));
      } catch (error) {
        console.error('Error reading users.json:', error);
        throw error;
      }
    }
  }

  // Function to load order data from the file and populate the Map
  async function getOrdersData(): Promise<Order[]> {
    try {
      const data = await fs.readFile(ordersFilePath, 'utf-8');
      return JSON.parse(data) as Order[];
    } catch (error) {
      console.error('Error reading orders.json:', error);
      throw error;
    }
  }

  // API endpoint to find user by ID
  app.get('/large/user/:id', async (req: Request, res: Response) => {
    let userId = req.params.id;
    try {
      await loadUsersData(); // Ensure data is loaded
      const user = usersMap.get(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ data: user, message: 'Success' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  // API endpoint to find user orders by ID
  app.get('/large/user/order/:id', async (req: Request, res: Response) => {
    let userId = req.params.id;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    try {
      await loadUsersData(); // Ensure data is loaded
      const user = usersMap.get(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        const orders = await getOrdersData();
        const userOrders = orders.filter((order) => order.user === userId);
        if (userOrders.length === 0) {
          return res.status(404).json({ message: 'No orders found for this user' });
        }
        const paginatedOrders = paginate(userOrders, { page, limit });

        if (paginatedOrders.length === 0) {
          return res.status(404).json({ message: 'No orders found for this user' });
        }
        return res.status(200).json({ data: paginatedOrders, message: 'Success' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  // API Endpoint to get total spending for a user
  app.get('/large/user/order/total/:id', async (req: Request, res: Response) => {
    let userId = req.params.id;
    try {
      await loadUsersData(); // Ensure data is loaded
      const user = usersMap.get(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        const orders = await getOrdersData();
        const userOrders = orders.filter((order) => order.user === userId);
        if (userOrders.length === 0) {
          return res.status(404).json({ message: 'No orders found for this user' });
        }
        const total = userOrders.reduce((total, order) => total + order.total, 0);
        return res.status(200).json({ data: total, message: 'Success' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
}
