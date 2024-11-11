import { NextRequest, NextResponse } from 'next/server';
import { signup } from '@/src/utils/users';

export async function POST(request: Request | NextRequest) {
  const { email, password, firstName, lastName, phoneNumber } = await request.json();
  const { success, message } = await signup(email, password, firstName, lastName, phoneNumber);

  if (!success) {
    return NextResponse.json({ message }, { status: 400 });
  }
  return NextResponse.json({}, { status: 201 });
}
