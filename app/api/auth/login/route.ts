import { COOKIE_NAME } from '@/constants';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { compare } from 'bcryptjs';

const MAX_AGE = 60 * 60; // 1 hour;

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (!body.username || !body.username.includes('@') || !body.password) {
    return null;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const account = await db.collection('accounts').findOne({ username: body.username });

  if (!account || !(await compare(body.password, account.password))) {
    client.close();
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 403,
      }
    );
  }

  const { password, ...accountFields } = account;

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

  const response = {
    ...accountFields,
    accessToken,
  };

  client.close();

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  });
}
