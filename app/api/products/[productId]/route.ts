import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@type/products';
import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';

type Params = {
  productId: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  const { params } = context;

  const data: Product[] = [...largeData, ...smallData] as unknown as Product[];
  const product = data.find((item) => item.id === params.productId);

  if (product) {
    return NextResponse.json({ data: product });
  }

  return NextResponse.json(new Error('Product not found'), { status: 404 });
}
