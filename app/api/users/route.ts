import { NextRequest, NextResponse } from 'next/server';
import { getUserById, decodeJWT, validateJWT } from '@/src/utils/users';

export async function GET(request: Request | NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!authorization) {
    return NextResponse.json({ message: 'No authorization header was provided' }, { status: 401 });
  }
  if (!validateJWT(authorization)) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { id } = decodeJWT(authorization);
  const user = getUserById(id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
