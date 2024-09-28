import { makeGetAllProductsService } from '@/src/presentation/factory/services/products/get-all-products-factory';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { limit, page } = Object.fromEntries(request.nextUrl.searchParams.entries()) as { limit: string; page: string };

  const response = await makeGetAllProductsService().exec(page, limit);
  return NextResponse.json(response, { status: response.statusCode });
}
