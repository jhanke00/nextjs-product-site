import { NextRequest, NextResponse } from 'next/server';
import largeData from '@mock/large/products.json';
import smallData from '@mock/small/products.json';
import { Product } from '@type/products';

const PAGE_SIZE = 21;

export async function GET(request: NextRequest) {
  const data: Product[] = [...largeData, ...smallData] as unknown as Product[];

  const searchParams = request.nextUrl.searchParams;
  const filters: Partial<Record<keyof Product, string | number | [number, number]>> = {};

  const page = searchParams.get('page');

  // Build filters based on search parameters
  searchParams.forEach((value, key) => {
    if (key in data[0]) {
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

  // Filter the data based on the filters
  const filteredData = data.filter((product) => {
    return Object.entries(filters).every(([key, value]) => {
      const productValue = product[key as keyof Product];

      if (Array.isArray(value)) {
        return +productValue >= value[0] && +productValue <= value[1];
      }

      if (typeof value === 'string') {
        return productValue?.toString().toLowerCase().includes(value.toString().toLowerCase());
      }

      if (typeof value === 'number') {
        return +productValue >= value - 1;
      }

      return productValue === value;
    });
  });

  const totalCount = filteredData.length;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  const startIndex = page !== null ? Number(page) * PAGE_SIZE : 0;

  return NextResponse.json({
    data: filteredData.slice(startIndex, startIndex + PAGE_SIZE),
    pagination: {
      pageCount,
      totalCount,
      page: Number(page),
    },
  });
}
