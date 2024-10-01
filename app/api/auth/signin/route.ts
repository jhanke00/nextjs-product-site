import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@utils/user/userModel';
import { connectToDatabase } from '@lib/db';
import { handleError, NotFoundError } from '@utils/apiErrors';
import { generateToken, validatePassword } from '@utils/auth/authService';
import type { ApiResponse } from '@type/http';

export async function POST(request: NextRequest): Promise<ApiResponse<{ token: string }>> {
  try {
    const { email, password } = await request.json();

    await connectToDatabase();

    const user = await UserModel.findOne({ email });
    if (!user) throw new NotFoundError('Invalid email or password');

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) throw new NotFoundError('Invalid email or password');

    const token = generateToken(user.id);

    return NextResponse.json({ data: { token }, message: 'User logged in', success: true }, { status: 200 });
  } catch (error) {
    return handleError(request, error);
  }
}
