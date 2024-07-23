import { NextRequest, NextResponse } from 'next/server';
import { addViewedProduct } from '@/src/lib/database';

export async function POST(request: NextRequest) {
  const { userId, productId } = await request.json();

  try {
    await addViewedProduct(userId, productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add viewed product' });
  }
}
