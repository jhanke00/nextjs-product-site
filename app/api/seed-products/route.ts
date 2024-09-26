import { seedProductsTable } from '@/scripts/seed-products';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = await seedProductsTable();
  return NextResponse.json({
    response,
  });
}
