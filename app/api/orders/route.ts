import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const orderUser = searchParams.get('id');

  const filePath = path.join(process.cwd(), 'src', 'mock', 'small', 'orders.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const orders = JSON.parse(fileContents);

  if (orderUser) {
    const order = orders.find((order: any) => order.user === orderUser);
    console.log(order);
    if (order) {
      return NextResponse.json(order);
    }
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const filePath = path.join(process.cwd(), 'src', 'mock', 'small', 'orders.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const orders = JSON.parse(fileContents);

  const newOrder = await request.json();
  orders.push(newOrder);

  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

  return NextResponse.json(newOrder, { status: 201 });
}
