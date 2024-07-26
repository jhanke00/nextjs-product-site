// app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

/** Get user information by user id with order info */
export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    if (!userId) {
      return NextResponse.json({ error: 'Please provide user id' }, { status: 200 });
    }
    console.log('userId', userId);
    const userData = await db
      .collection('users')
      .aggregate([
        {
          $match: { id: userId },
        },
        {
          $lookup: {
            from: 'orders',
            localField: 'id',
            foreignField: 'user',
            as: 'orderDetails',
          },
        },
        {
          $unwind: '$orderDetails',
        },
      ])
      .toArray();
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
