import { NextResponse } from 'next/server';
import { getOrdersByUserId } from '@utils/users';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const paginatedOrders = await getOrdersByUserId(params.userId, page, limit);
  return NextResponse.json(paginatedOrders);
}
