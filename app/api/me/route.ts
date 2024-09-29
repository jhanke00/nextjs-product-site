import { makeAuthMiddleware } from '@/src/presentation/factory/middlewares/users-auth-middleware-factory';
import { makeFindUserByEmailService } from '@/src/presentation/factory/services/users/find-user-by-email-service-factory';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextResponse, NextRequest } from 'next/server';

export async function medHandler(request: NextRequest) {
  const userEmail = request.headers.get('x-user-email');

  const response = await makeFindUserByEmailService().exec(userEmail!);

  return NextResponse.json(response, { status: response.statusCode });
}

export const GET = middlewaresHandler(medHandler, makeAuthMiddleware());
