import { makeAuthMiddleware } from '@/src/presentation/factory/middlewares/users-auth-middleware-factory';
import { makeGetUserOrdersService } from '@/src/presentation/factory/services/users/get-user-orders-service-factory';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextResponse, NextRequest } from 'next/server';

export async function getUserOrdersHandler(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await makeGetUserOrdersService().exec(params.id);
  return NextResponse.json(response, { status: response.statusCode });
}

export const GET = middlewaresHandler(getUserOrdersHandler, makeAuthMiddleware());
