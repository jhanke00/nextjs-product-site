import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/src/database/datasource';
import { User } from '@prisma/client';

/**
 * Sends a POST request to the server with the provided username and password.
 *
 * @param {NextRequest} request - The request object containing the username and password in JSON format.
 * @returns {Promise<NextResponse>} - The response object with the generated token if the username and password are valid, otherwise an error message.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const prisma = await connectToDatabase();

  const data: User = (await request.json()) as unknown as User;

  if (data.username && data.password) {
    const user = await prisma.user.findFirst({ where: { username: data.username } });

    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token, user }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
}
