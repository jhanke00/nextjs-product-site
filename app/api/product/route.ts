import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Product } from '@/src/type/products';

export function GET() {
  try {
    const filePath = path.resolve('src/mock/small', 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const products: Product[] = JSON.parse(fileData);

    const inStockProducts = products.filter((product) => product.countInStock > 0);

    return NextResponse.json(inStockProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
