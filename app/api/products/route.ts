import { NextRequest, NextResponse } from 'next/server';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

const allProducts = [...largeData, ...smallData];

export async function GET(req: NextRequest, res: NextResponse) {
  debugger;
  const { searchParams } = new URL(req.url) || {};
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '20';
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(size, 10);

  if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(pageSize) || pageSize <= 0) {
    //return res.status(400).json({ error: 'Invalid page or size parameter' });
    return new Response('Invalid page or size parameter', {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = allProducts.slice(startIndex, endIndex);
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  return new Response(JSON.stringify({ data: paginatedData, totalPages }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
