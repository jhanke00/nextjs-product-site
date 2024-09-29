import { makeAuthMiddleware } from '@/src/presentation/factory/middlewares/users-auth-middleware-factory';
import { makeGetUserAmountSpentWithService } from '@/src/presentation/factory/services/users/get-user-amount-spent-with-service-factory';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextResponse, NextRequest } from 'next/server';

interface IExpectedParams { 
  params: { id: string };
}

async function getUserAmountSpentWithOrdersHandler(
  request: NextRequest,
  { params }: IExpectedParams
) {
  const response = await makeGetUserAmountSpentWithService().exec(params.id);
  return NextResponse.json(response, { status: response.statusCode });
}

export const GET = async (request: NextRequest, { params }: IExpectedParams) => {
  return middlewaresHandler(getUserAmountSpentWithOrdersHandler, makeAuthMiddleware())(request, { params });
};
