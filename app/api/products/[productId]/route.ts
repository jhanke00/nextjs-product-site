import { NextRequest } from 'next/server';
import { db } from '@/infra/db';
import { Product } from '@/src/type/products';
import { ProductRepository } from '@/src/utils/products/repository';

const productRepository = ProductRepository({ db });
const headers = { 'Content-Type': 'application/json' };

export async function GET(_: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await productRepository.getById(parseInt(productId));

  if (!product) {
    return new Response(`Could not find product by ID: ${productId}`, {
      status: 404,
      headers,
    });
  }

  return new Response(JSON.stringify({ product }), { headers });
}
