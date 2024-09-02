import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/src/database/datasource';

type Params = {
  productId: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  const { params } = context;

  const prisma = await connectToDatabase();
  const product = await prisma.product.findFirst({
    where: {
      id: params.productId,
    },
  });

  if (product) {
    return NextResponse.json({ data: product });
  }

  return NextResponse.json(new Error('Product not found'), { status: 404 });
}
