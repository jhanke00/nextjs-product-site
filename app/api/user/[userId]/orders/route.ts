import { NextRequest, NextResponse } from 'next/server';
import { getOrdersByUserId } from '@utils/order/orderService';
import { handleError } from '@utils/apiErrors';

type Context = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, context: Context) {
  const res = NextResponse;
  try {
    const userId = context.params.userId;
    const data = await getOrdersByUserId(userId);

    return res.json({ data, message: 'User orders found' }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
