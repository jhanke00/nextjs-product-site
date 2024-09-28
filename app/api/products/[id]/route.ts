
import { makeFindProductByIdService } from '@/src/presentation/factory/services/products/find-product-by-id-factory';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await makeFindProductByIdService().exec(params.id);
  return NextResponse.json(response, {status: response.statusCode});
}
