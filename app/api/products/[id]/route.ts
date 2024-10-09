import { NextRequest } from 'next/server';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

const allProducts = [...largeData, ...smallData];

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id) {
    return new Response('Product ID is required', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return new Response('Product not found', {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
