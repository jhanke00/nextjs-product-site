import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/src/database/datasource';
import { User } from '@prisma/client';

/**
 * Handles the POST request to create a new user.
 *
 * @param {NextRequest} request - The incoming request object containing the user data.
 * @return {Promise<NextResponse>} - The response object containing the JWT token and the saved user data, or an error message.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const prisma = await connectToDatabase();

  const user: User = (await request.json()) as unknown as User;

  if (!user.username || !user.password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const savedUser = await prisma.user.create({ data: { ...user, password: hashedPassword } });

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return NextResponse.json({ token, user: savedUser }, { status: 201 });
}
