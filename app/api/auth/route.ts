import { NextRequest, NextResponse } from 'next/server';
import { getUserById, authorize } from '@/src/utils/users';

export async function POST(request: Request | NextRequest) {
  const { email, password } = await request.json();
  const isUserAuthorized = await authorize(email, password);
  const { success, token, message } = isUserAuthorized;

  if (!success) {
    return NextResponse.json({ message }, { status: 401 });
  }
  return NextResponse.json({ token }, { status: 200 });
}
