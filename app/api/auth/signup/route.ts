import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { COOKIE_NAME } from '@/constants';
import { sign } from 'jsonwebtoken';

const MAX_AGE = 60 * 60; // 1 hour;

interface RequestBody {
  username: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (!body.username || !body.username.includes('@') || !body.password) {
    return NextResponse.json(
      {
        message: 'Unathorized',
      },
      {
        status: 401,
      }
    );
  }

  const client = await connectToDatabase();
  const db = client.db();

  const checkExists = await db.collection('accounts').findOne({ username: body.username });

  if (checkExists) {
    client.close();
    return NextResponse.json(
      {
        message: 'Found existing usere',
      },
      {
        status: 422,
      }
    );
  }

  const hashedPassword = await hashPassword(body.password);

  const result = await db.collection('accounts').insertOne({
    username: body.username,
    password: hashedPassword,
    name: body.name,
  });

  const secret = process.env.JWT_SECRET || '';

  const accessToken = sign(
    {
      username: body.username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize(COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  client.close();

  const response = {
    name: body.name,
    username: body.username,
    accessToken: accessToken,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  });
}
