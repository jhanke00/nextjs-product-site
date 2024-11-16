import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/infra/db/mongo/mongo';
import User from '@/infra/db/mongo/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'simple-jwt-secret';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json(
      {
        token,
        user: {
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
  }
}
