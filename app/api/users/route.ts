// app/api/users/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'mock', 'small', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const filePath = path.join(process.cwd(), 'src', 'mock', 'small', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  const newUser = await request.json();
  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json(newUser, { status: 201 });
}
