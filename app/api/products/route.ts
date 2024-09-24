import { prisma } from '@/src/utils/prisma-client';
import { NextRequest } from 'next/server';

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

    return new Response(JSON.stringify(stringPricedProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
