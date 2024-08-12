import { NextResponse } from 'next/server';
import { getOrdersByUserId } from '@utils/users';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const orders = await getOrdersByUserId(params.userId);
  return NextResponse.json(orders);
}
