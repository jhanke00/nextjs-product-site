import { NextRequest, NextResponse } from 'next/server';
import { decodeJWT, validateJWT } from '@/src/utils/users';
import { getOrdersByUserId, calculateTotalSpent } from '@/src/utils/orders';

export async function GET(request: Request | NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'No authorization header was provided' }, { status: 401 });
  }
  if (!validateJWT(authorization)) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { id } = decodeJWT(authorization);

  const orders = getOrdersByUserId(id);

  if (orders.length > 0) {
    const totalSpent = calculateTotalSpent(orders);
    return NextResponse.json({ totalSpent });
  } else {
    return NextResponse.json({ message: 'No orders found for this user', totalSpent: 0 });
  }
}
