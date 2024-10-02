import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@utils/user/userService';
import { handleError } from '@utils/apiErrors';
import type { User, UserRouterContext } from '@type/users';
import type { ApiResponse } from '@type/http';

export async function GET(req: NextRequest, context: UserRouterContext): Promise<ApiResponse<User>> {
  try {
    const userId = context.params.userId;
    const data = await getUserById(userId);

    return NextResponse.json({ data, message: 'User found', success: true }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
