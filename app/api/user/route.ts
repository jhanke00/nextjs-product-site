import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export interface User {
  id: number;
  name: string;
  email: string;
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed', status: 405 });
  }
  const { userId: user_id } = await request.json();

  try {
    const usersPath = path.join(process.cwd(), 'public/data', 'users.json');
    const usersData = fs.readFileSync(usersPath);
    const users: User[] = JSON.parse(usersData.toString());
    const userId = parseInt(user_id as string, 10);

    if (!userId) {
      return NextResponse.json({ message: 'user id is required', status: 400 });
    }
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found', status: 404 });
    }
    //console.log(user, 'user');
    //return NextResponse.json({ message: 'User found', status: 200, data: user });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error', status: 500 });
  }
}
