import { capitalizeEmail } from '@/src/utils/users/capitalizeEmail';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface UserProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { firstName, lastName, phoneNumber, email }: UserProps = await request.json();

    const emailFormatted = capitalizeEmail(email);

    const userExists = await prisma.user.findUnique({
      where: {
        email: emailFormatted,
      },
    });

    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: emailFormatted,
      },
    });
    return NextResponse.json('User created successfully', { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
