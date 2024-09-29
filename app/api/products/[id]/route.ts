import { makeAuthMiddleware } from '@/src/presentation/factory/middlewares/users-auth-middleware-factory';
import { makeFindProductByIdService } from '@/src/presentation/factory/services/products/find-product-by-id-factory';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextResponse, NextRequest } from 'next/server';

export async function getProductByIdHandler(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await makeFindProductByIdService().exec(params.id);
  return NextResponse.json(response, { status: response.statusCode });
}

export const GET = middlewaresHandler(getProductByIdHandler, makeAuthMiddleware());
