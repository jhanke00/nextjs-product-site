import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Order } from '@/src/type/orders';

export async function GET(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split('/');
    const id = segments[segments.length - 3];

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const filePath = path.resolve('src/mock/small', 'orders.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const orders: Order[] = JSON.parse(fileData);

    const userOrders = orders.filter((order) => order.user === id);
    const totalSum = userOrders.reduce((sum, order) => sum + (order.total || 0), 0);

    return NextResponse.json({ total: totalSum });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
