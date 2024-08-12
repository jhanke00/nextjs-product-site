import { NextResponse } from 'next/server';
import { getUserById } from '@utils/users';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const user = await getUserById(params.userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}
