import { NextRequest, NextResponse } from 'next/server';
import { getUserTotalSpent } from '@utils/order/orderService';
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
    const data = await getUserTotalSpent(userId);

    return res.json({ data, message: 'User spent found' }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
