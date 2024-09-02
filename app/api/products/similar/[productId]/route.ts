import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/database/datasource';
import { take } from 'lodash';

type Params = {
  productId: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const { params } = context;
  const searchParams = request.nextUrl.searchParams;
  const take = Number(searchParams.get('take')) || 4;

  const prisma = await connectToDatabase();
  const product = await prisma.product.findFirst({
    where: {
      id: params.productId,
    },
  });

  if (product) {
    const similarProducts = await prisma.product.findMany({
      where: {
        NOT: { id: params.productId },
        category: product.category,
        price: { gte: product.price - 50, lte: product.price + 50 },
      },
      take,
    });

    return NextResponse.json({ data: similarProducts });
  }

  return NextResponse.json(new Error('Product not found'), { status: 404 });
}
