import { NextRequest, NextResponse } from 'next/server';
import { getOrdersByUserId } from '@utils/order/orderService';
import { handleError } from '@utils/apiErrors';
import type { ApiResponse } from '@type/http';
import type { Order } from '@type/orders';
import type { UserRouterContext } from '@type/users';

export async function GET(req: NextRequest, context: UserRouterContext): Promise<ApiResponse<Order[]>> {
  try {
    const userId = context.params.userId;
    const data = await getOrdersByUserId(userId);

    return NextResponse.json({ data, message: 'User orders found', success: true }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
