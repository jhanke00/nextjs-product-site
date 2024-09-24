import { prisma } from '@/src/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { productId: string };
};

export async function GET(_request: NextRequest, context: Context) {
  const { productId } = context.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // format price
    const formattedProduct = {
      ...product,
      price: `$${(product.price / 100).toFixed(2)}`,
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
