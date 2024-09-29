import { makeLoginService } from '@/src/presentation/factory/services/users/login-service-factory';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const response = await makeLoginService().exec({ email, password });
  return NextResponse.json(response, { status: response.statusCode });
}
