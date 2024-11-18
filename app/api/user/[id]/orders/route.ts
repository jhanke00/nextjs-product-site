import path from 'path';
import fs from 'fs';
import { Order } from '@/src/type/orders';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split('/');
    const id = segments[segments.length - 2];

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const filePath = path.resolve('src/mock/small', 'orders.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');

    const orders: Order[] = JSON.parse(fileData);

    const userOrders = orders.filter((order) => order.user === id);

    if (userOrders.length) {
      return NextResponse.json(userOrders, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Orders not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
