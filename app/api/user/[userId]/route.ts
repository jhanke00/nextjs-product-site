import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '@utils/user/userService';
import { handleError } from '@utils/apiErrors';

type Context = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, context: Context) {
  const res = NextResponse;
  try {
    const userId = context.params.userId;
    const data = await getUserById(userId);

    return res.json({ data, message: 'User found' }, { status: 200 });
  } catch (error) {
    return handleError(req, error);
  }
}
