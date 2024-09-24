import { prisma } from '@/src/utils/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // revalidate every hour

export async function GET(_request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });

    // format price
    const stringPricedProducts = products.map((product) => ({
      ...product,
      price: `${(product.price / 100).toFixed(2)}`,
    }));

    return NextResponse.json(stringPricedProducts, {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
