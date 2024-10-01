import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '@utils/user/userModel';
import { connectToDatabase } from '@lib/db';
import type { ApiResponse } from '@type/http';
import { handleError } from '@utils/apiErrors';
import { generatePasswordHash, generateToken } from '@utils/auth/authService';

export async function POST(request: NextRequest): Promise<ApiResponse<{ token: string }>> {
  try {
    const { firstName, lastName, phoneNumber, email, password } = await request.json();

    const hashedPassword = await generatePasswordHash(password);

    await connectToDatabase();

    const id = uuidv4();
    const newUser = new UserModel({ id, firstName, lastName, phoneNumber, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser.id);

    return NextResponse.json(
      {
        data: { token },
        message: 'User created successfully',
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(request, error);
  }
}
