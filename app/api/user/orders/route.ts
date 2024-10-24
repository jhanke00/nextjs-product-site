import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { getOrdersFromUser } from '@/src/utils/db/orders';
import { authMiddleware, errorHandler } from '@/src/utils/helpers';

export async function GET(request: NextRequest) {
  return authMiddleware(request).then(processRequest).catch(errorHandler);
}

const processRequest = async ({ user }: { user: User }) => {
  const userInfo = await getOrdersFromUser(user.id);

  return NextResponse.json({ orders: assembleResponse(userInfo!.orders ?? []) });
};

const assembleResponse = (orders: any[]) =>
  orders.map(({ products, userId: _userId, ...order }) => ({
    ...order,
    products: products.map(({ count, product }: any) => ({
      count,
      name: product.name,
      price: product.price,
      description: product.description,
    })),
  }));
