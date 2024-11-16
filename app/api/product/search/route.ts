import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/src/type/products';

export async function GET(req: NextRequest) {
  try {
    const searchTerm = req.nextUrl.searchParams.get('q');
    if (!searchTerm) {
      return NextResponse.json({ message: 'Search term is required' }, { status: 400 });
    }

    const filePath = path.resolve('src/mock/small', 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const products: Product[] = JSON.parse(fileData);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      return NextResponse.json({ message: 'No product found' }, { status: 404 });
    }

    return NextResponse.json(filteredProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
