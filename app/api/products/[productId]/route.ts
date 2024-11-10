import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '../../../../src/utils/products';

export async function GET(request: Request | NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    const productId = segments[segments.length - 1];

    const product = getProductById(productId);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
