import { NextRequest, NextResponse } from 'next/server';
import { login, LoginDto } from '@/src/utils/users';

export async function POST(request: Request | NextRequest) {
  const data = await request.json();
  const dto = new LoginDto();
  Object.assign(dto, data);

  const { success, token, message } = await login(dto);

  if (!success) {
    return NextResponse.json({ message }, { status: 401 });
  }
  return NextResponse.json({ token }, { status: 200 });
}
