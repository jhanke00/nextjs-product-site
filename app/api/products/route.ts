import { NextRequest, NextResponse } from 'next/server';
import { getProducts, searchProducts } from '../../../src/utils/products';

// Handle GET requests
export async function GET(request: Request | NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const searchQuery = searchParams.get('search');

    if (searchQuery) {
      // If a search query is provided, use this function to filter the results
      const results = searchProducts(searchQuery, Number(limit), Number(offset));
      return NextResponse.json(results);
    } else {
      // Otherwise, return the paginated list of products
      const products = getProducts(Number(limit), Number(offset));
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
