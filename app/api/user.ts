import express, { Express, Request, Response } from 'express';
import fs from 'fs';
export function userRoutes(app: express.Application) {
  //small dataset
  app.get('/user/:id', (req: Request, res: Response) => {
    try {
      let userId: string = req.params.id; // Assuming userId is passed as a route parameter
      const usersData = JSON.parse(fs.readFileSync('./src/mock/small/users.json', 'utf8'));
      const data = [...usersData];
      const user = data.find((item: any) => item.id == userId);
      return res.status(200).json({ data: user, message: 'Success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  //small dataset
  app.get('/user/order/:id', (req: Request, res: Response) => {
    try {
      let userId: string = req.params.id; // Assuming userId is passed as a route parameter
      const ordersData = JSON.parse(fs.readFileSync('./src/mock/small/orders.json', 'utf8'));
      const data = [...ordersData];
      const orders = data.filter((order: any) => order.user === userId);
      return res.status(200).json({ data: { orders: orders }, message: 'Success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  app.get('/user/order/total/:id', (req: Request, res: Response) => {
    try {
      let userId: string = req.params.id; // Assuming userId is passed as a route parameter
      const ordersData = JSON.parse(fs.readFileSync('./src/mock/small/orders.json', 'utf8'));
      const data = [...ordersData];
      const orders = data.filter((order: any) => order.user === userId);
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
      const totalSpent = data.reduce((acc, order) => acc + order.total, 0);
      return res.status(200).json({ data: { total_spent: totalSpent }, message: 'Success' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
}
