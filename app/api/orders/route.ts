import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { calculateTotal } from '@/src/utils/orders/calculateTotal';

const prisma = new PrismaClient();

interface ItemProps {
  productId: string;
  price: number;
  count: number;
}

interface OrderProps {
  userId: string;
  items: Array<ItemProps>;
  total: number;
  time: Date;
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId, items }: OrderProps = await request.json();

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const productExist = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item: ItemProps) => item.productId),
      },
    },
  });

  if (productExist.length !== items.length) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const total = calculateTotal(items);

  try {
    await prisma.order.create({
      data: {
        userId: userId,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            price: item.price,
            count: item.count,
          })),
        },
      },
    });

    return NextResponse.json('Order created successfully', { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
