import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/src/utils/users';

export async function POST(request: Request | NextRequest) {
  const { email, password } = await request.json();
  const { success, token, message } = await login(email, password);

  if (!success) {
    return NextResponse.json({ message }, { status: 401 });
  }
  return NextResponse.json({ token }, { status: 200 });
}
