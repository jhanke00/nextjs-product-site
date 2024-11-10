import { NextRequest, NextResponse } from 'next/server';
import { decodeJWT, validateJWT } from '@/src/utils/users';
import { getOrdersByUserId } from '@/src/utils/orders';

export async function GET(request: Request | NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'No authorization header was provided' }, { status: 401 });
  }
  if (!validateJWT(authorization)) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const { id } = decodeJWT(authorization);

  const orders = getOrdersByUserId(id, Number(limit), Number(offset));
  if (orders.length > 0) {
    return NextResponse.json(orders);
  } else {
    return NextResponse.json({ message: 'No orders found for this user' }, { status: 404 });
  }
}
