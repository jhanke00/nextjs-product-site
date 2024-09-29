import { makeAuthMiddleware } from '@/src/presentation/factory/middlewares/users-auth-middleware-factory';
import { makeGetUserAmountSpentWithService } from '@/src/presentation/factory/services/users/get-user-amount-spent-with-service-factory';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextResponse, NextRequest } from 'next/server';

export async function getUserAmountSpentWithOrdersHandler(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await makeGetUserAmountSpentWithService().exec(params.id);
  return NextResponse.json(response, { status: response.statusCode });
}

export const GET = middlewaresHandler(getUserAmountSpentWithOrdersHandler, makeAuthMiddleware());
