import { seedData } from '@/scripts/seed-data';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = await seedData();
  return NextResponse.json({
    response,
  });
}
