import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { capitalizeEmail } from '@/src/utils/users/capitalizeEmail';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailFormatted = capitalizeEmail(email);

    const user = await prisma.user.findUnique({
      where: {
        email: emailFormatted,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
