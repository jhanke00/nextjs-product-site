import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Order } from '../models/Order';
import { ApiError } from '../models/Error';
//import connectDb from '../../utils/connectDb';
//import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order[] | ApiError | { userspend: number } | { totalSpent: number }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed', status: 405 });
  }
  try {
    //await connectDb();
    // const token = req.headers.authorization.split(' ')[1];
    // const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    // const orders = await Order.find({ userId: decoded.userId });
    // res.status(200).json(orders);

    const rawBody = req.body; // Access raw body data

    const ordersPath = path.join(process.cwd(), 'public/data', 'orders.json');
    const ordersData = fs.readFileSync(ordersPath);
    const orders: Order[] = JSON.parse(ordersData.toString());
    const userId = parseInt(rawBody.userId as string, 10);
    if (!userId) {
      return res.status(400).json({ message: 'user id is required', status: 400 });
    }
    const userOrders = orders.filter((order) => order.userId === userId);
    if (!userOrders) {
      return res.status(404).json({ message: 'Order not found', status: 404 });
    }
    switch (rawBody.action) {
      case 'order':
        res.status(200).json(userOrders);
        break;

      case 'userspend':
        const userspend = userOrders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.status(200).json({ userspend });
        break;

      case 'totalspend':
        const orders: Order[] = JSON.parse(ordersData.toString());
        const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.status(200).json({ totalSpent });
        break;

      default:
        res.status(400).json({ message: 'Invalid action', status: 400 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', status: 500 });
  }
}
