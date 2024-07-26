import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

/** Get Products by product name */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('query');

    if (!searchQuery) {
      return NextResponse.json({ error: 'Search query product name is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const products = await db
      .collection('products')
      .find({
        name: { $regex: `^${searchQuery}`, $options: 'i' },
      })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to search products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
