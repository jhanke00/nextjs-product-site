import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { getOrdersFromUser } from '@/src/utils/db/orders';
import { authMiddleware, errorHandler } from '@/src/utils/helpers';

export async function GET(request: NextRequest) {
  return authMiddleware(request).then(processRequest).catch(errorHandler);
}

const processRequest = async ({ user }: { user: User }) => {
  const userInfo = await getOrdersFromUser(user.id);

  return NextResponse.json({ amount: calculateAmount(userInfo?.orders ?? []) });
};

const calculateAmount = (orders: any[]) =>
  orders.reduce((accumulator: number, actual: any) => accumulator + actual.total, 0);
