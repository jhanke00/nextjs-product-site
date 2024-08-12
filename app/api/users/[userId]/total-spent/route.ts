import { NextResponse } from 'next/server';
import { getTotalSpentByUserId } from '@utils/users';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const totalSpent = await getTotalSpentByUserId(params.userId);
  return NextResponse.json({ totalSpent });
}
