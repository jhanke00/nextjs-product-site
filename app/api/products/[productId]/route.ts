import { prisma } from '@/src/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { productId: string };
};

export const revalidate = 3600; // revalidate every hour

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

    return NextResponse.json(formattedProduct, {
      headers: {
        'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
