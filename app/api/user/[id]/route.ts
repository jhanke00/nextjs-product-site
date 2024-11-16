import fs from 'fs';
import path from 'path';
import { User } from '@/src/type/users';
import { NextRequest, NextResponse } from 'next/server';

type IUser = Omit<User, 'id'> & {
  id: string;
};

export async function GET(req: NextRequest) {
  try {
    const segments = req.nextUrl.pathname.split('/');
    const id = segments[segments.length - 1];

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const filePath = path.resolve('src/mock/small', 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users: IUser[] = JSON.parse(fileData);

    const user = users.find((user) => user.id === id);

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong...', error: error }, { status: 500 });
  }
}
