import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/src/utils/users';
import { SignupDto } from '@/src/utils/users';

export async function POST(request: Request | NextRequest) {
  const data = await request.json();
  const dto = new SignupDto();
  Object.assign(dto, data);

  const { success, message } = signup(dto);

  if (!success) {
    return NextResponse.json({ message }, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}
