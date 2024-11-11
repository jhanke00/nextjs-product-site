import { NextRequest, NextResponse } from 'next/server';
import { getUserById, isAuthorized } from '@/src/utils/users';

export async function GET(request: Request | NextRequest) {
  const authorization = isAuthorized(request);
  if (!authorization.success) {
    return NextResponse.json({ message: authorization.message }, { status: 401 });
  }

  const user = getUserById(authorization.id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}
