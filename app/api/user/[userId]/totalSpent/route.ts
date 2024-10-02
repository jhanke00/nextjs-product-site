import { NextRequest, NextResponse } from 'next/server';
import { getUserTotalSpent } from '@utils/order/orderService';
import { handleError } from '@utils/apiErrors';
import type { ApiResponse } from '@type/http';
import type { UserRouterContext } from '@type/users';

export async function GET(req: NextRequest, context: UserRouterContext): Promise<ApiResponse<number>> {
  try {
    const userId = context.params.userId;
    const data = await getUserTotalSpent(userId);

    return NextResponse.json({ data, message: 'User spent found', success: true }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
