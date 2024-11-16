import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/infra/db/mongo/mongo';
import User from '@/infra/db/mongo/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'simple-jwt-secret';

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, password } = await req.json();

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email is already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token, user: { firstname, lastname, email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
  }
}
