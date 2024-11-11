import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from '@/src/utils/users';
import { getOrdersByUserId, calculateTotalSpent } from '@/src/utils/orders';

export async function GET(request: Request | NextRequest) {
  const authorization = isAuthorized(request);
  if (!authorization.success) {
    return NextResponse.json({ message: authorization.message }, { status: 401 });
  }

  const orders = getOrdersByUserId(authorization.id);

  if (orders.length > 0) {
    const totalSpent = calculateTotalSpent(orders);
    return NextResponse.json({ totalSpent });
  } else {
    return NextResponse.json({ message: 'No orders found for this user', totalSpent: 0 });
  }
}
