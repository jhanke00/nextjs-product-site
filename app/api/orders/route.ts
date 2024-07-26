import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

/** Get All Orders */
export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const orders = await db.collection('orders').find({}).toArray();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
