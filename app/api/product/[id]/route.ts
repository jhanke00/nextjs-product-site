import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/src/type/products';

type IProduct = Omit<Product, 'id'> & {
  id: string;
};

export async function GET(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split('/');
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const filePath = path.resolve('src/mock/small', 'products.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const products: IProduct[] = JSON.parse(fileData);

    const product = products.find((product) => product.id === id);

    if (!product) {
      return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
