import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export interface Order {
  id: number;
  userId: number;
  items: { productId: number; quantity: number; price: number }[];
  totalPrice: number;
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed', status: 405 });
  }
  const { userId: user_id, action } = await request.json();

  try {
    const ordersPath = path.join(process.cwd(), 'public/data', 'orders.json');
    const ordersData = fs.readFileSync(ordersPath);
    const orders: Order[] = JSON.parse(ordersData.toString());
    const userId = parseInt(user_id as string, 10);
    if (!userId) {
      return NextResponse.json({ message: 'user id is required', status: 400 });
    }
    const userOrders = orders.filter((order) => order.userId === userId);
    if (!userOrders) {
      return NextResponse.json({ message: 'Order not found', status: 404 });
    }

    switch (action) {
      case 'order':
        return NextResponse.json(userOrders);
        break;

      case 'userspend':
        const userspend = userOrders.reduce((acc, order) => acc + order.totalPrice, 0);
        return NextResponse.json({ userspend });
        break;

      case 'totalspend':
        const orders: Order[] = JSON.parse(ordersData.toString());
        const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        return NextResponse.json({ totalSpent });
        break;

      default:
        return NextResponse.json({ message: 'Invalid action', status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error', status: 500 });
  }
}

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method Not Allowed', status: 405 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('userId');
    const action = searchParams.get('action');
    const ordersPath = path.join(process.cwd(), 'public/data', 'orders.json');
    const ordersData = fs.readFileSync(ordersPath);
    const orders: Order[] = JSON.parse(ordersData.toString());
    const userId = parseInt(user_id as string, 10);
    if (!userId) {
      return NextResponse.json({ message: 'user id is required', status: 400 });
    }
    const userOrders = orders.filter((order) => order.userId === userId);
    if (!userOrders) {
      return NextResponse.json({ message: 'Order not found', status: 404 });
    }

    switch (action) {
      case 'order':
        return NextResponse.json(userOrders);
        break;

      case 'userspend':
        const userspend = userOrders.reduce((acc, order) => acc + order.totalPrice, 0);
        return NextResponse.json({ userspend });
        break;

      case 'totalspend':
        const orders: Order[] = JSON.parse(ordersData.toString());
        const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        return NextResponse.json({ totalSpent });
        break;

      default:
        return NextResponse.json({ message: 'Invalid action', status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error', status: 500 });
  }
}
