import { Request, Response } from 'express';
import { Order } from './shared/order.type';
import { User } from './shared/user.type';
import { data } from '../__mock__/data';

export function getUserById(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 405,
      response: 'Method not allowed',
    });
  }
  const userFound: User | undefined = data.users.find((user: User) => user.id === req.params.id);
  if (!userFound) {
    return res.status(404).json({
      status: 404,
      response: 'User not found',
    });
  }
  return res.status(200).json({
    status: 200,
    response: userFound,
  });
}

export function getOrdersByUserId(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 405,
      response: 'Method not allowed',
    });
  }

  const userFound: User | undefined = data.users.find((user: User) => user.id === req.params.id);
  if (!userFound) {
    return res.status(404).json({
      status: 404,
      response: 'User not found',
    });
  }

  let userOrders: Order[] = (data.orders as any[]).filter((order: Order) => order.user === userFound?.id);
  if (userOrders.length === 0) {
    return res.status(204).json({
      status: 204,
      response: 'No orders found',
    });
  }

  if (req.query?.from) {
    // Retuns orders from specific date
    const fromDate = new Date(<string>req.query.from);
    userOrders = userOrders.filter((order: Order) => {
      const userOrderTime = new Date(order.time);
      return userOrderTime >= fromDate;
    });
  }

  if (req.query?.to) {
    // Returns orders to specific date
    const toDate = new Date(<string>req.query.to);
    userOrders = userOrders.filter((order: Order) => {
      const userOrderTime = new Date(order.time);
      return userOrderTime <= toDate;
    });
  }

  const statusCode = userOrders.length === 0 ? 204 : 200;
  const ordersResponse = userOrders.length === 0 ? 'No orders found' : userOrders;
  return res.status(statusCode).json({
    status: statusCode,
    response: ordersResponse,
  });
}

export function getOrdersSpentByUserId(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 405,
      response: 'Method not allowed',
    });
  }

  const userFound: User | undefined = data.users.find((user: User) => user.id === req.params.id);
  if (!userFound) {
    res.status(404).json({
      status: 404,
      response: 'User not found',
    });
  }

  let userOrders = (data.orders as any[]).filter((order: Order) => order.user === userFound?.id);
  if (userOrders.length === 0) {
    return res.status(204).json({
      status: 204,
      response: 'No orders found',
    });
  }

  if (req.query?.from) {
    const fromDate = new Date(<string>req.query.from);
    userOrders = userOrders.filter((order: Order) => {
      const userOrderTime = new Date(order.time);
      return userOrderTime >= fromDate;
    });
  }

  if (req.query?.to) {
    const toDate = new Date(<string>req.query.to);
    userOrders = userOrders.filter((order: Order) => {
      const userOrderTime = new Date(order.time);
      return userOrderTime <= toDate;
    });
  }

  const userTotalSpent = userOrders.reduce((total: number, order: Order) => total + order.total, 0);

  return res.status(200).json({
    status: 200,
    response: userTotalSpent,
  });
}
