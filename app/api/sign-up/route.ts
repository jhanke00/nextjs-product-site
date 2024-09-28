import { makeSignUpService } from '@/src/presentation/factory/services/users/sign-up-service-factory';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const response = await makeSignUpService().exec(data);
  return NextResponse.json(response, { status: response.statusCode });
}
