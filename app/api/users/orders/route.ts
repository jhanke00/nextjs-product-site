import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from '@/src/utils/users';
import { getOrdersByUserId } from '@/src/utils/orders';

export async function GET(request: Request | NextRequest) {
  const authorization = isAuthorized(request);
  if (!authorization.success) {
    return NextResponse.json({ message: authorization.message }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const orders = getOrdersByUserId(authorization.id, Number(limit), Number(offset));
  if (orders.length > 0) {
    return NextResponse.json(orders);
  } else {
    return NextResponse.json({ message: 'No orders found for this user' }, { status: 404 });
  }
}
