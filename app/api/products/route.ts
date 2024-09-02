import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@type/products';
import { connectToDatabase } from '@/src/database/datasource';

const PAGE_SIZE = 21;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters: Partial<Record<keyof Product, string | number | [number, number]>> = {};
  const page = searchParams.get('page');
  const prisma = await connectToDatabase();

  searchParams.forEach((value, key) => {
    if (key !== 'page') {
      if (value !== '' && value !== undefined) {
        if (value.includes(',')) {
          const range = value.split(',').map(Number);
          filters[key as keyof Product] = [range[0], range[1]];
        } else {
          filters[key as keyof Product] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    }
  });

  const mongoFilters: any = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      mongoFilters[key] = { gte: value[0], lte: value[1] };
    } else if (typeof value === 'string') {
      mongoFilters[key] = { contains: value }; // Case-insensitive regex search
    } else {
      mongoFilters[key] = { gte: value };
    }
  });
  //
  const totalCount = await prisma.product.count({
    where: mongoFilters,
  });
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  const products = await prisma.product.findMany({
    where: mongoFilters,
    take: PAGE_SIZE,
    skip: Number(page),
  });

  return NextResponse.json({
    data: products,
    pagination: {
      pageCount,
      totalCount,
      page: Number(page),
    },
  });
}
