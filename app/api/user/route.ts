import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { authMiddleware, errorHandler } from '@/src/utils/helpers';

export async function GET(request: NextRequest) {
  return authMiddleware(request).then(processRequest).catch(errorHandler);
}

const processRequest = async ({ user }: { user: User }) => {
  const { password: _password, ...userInfo } = user;

  return NextResponse.json(userInfo);
};
