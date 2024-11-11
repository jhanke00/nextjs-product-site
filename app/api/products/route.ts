import { NextRequest, NextResponse } from 'next/server';
import { getProducts, searchProducts } from '../../../src/utils/products';

export async function GET(request: Request | NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      const results = searchProducts(searchQuery, Number(limit), Number(offset));
      return NextResponse.json(results);
    }

    const products = getProducts(Number(limit), Number(offset));
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
