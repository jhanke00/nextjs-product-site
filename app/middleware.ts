import { verifyToken } from '@utils/auth/authService';
import { NextRequest, NextResponse } from 'next/server';

async function middleware(req: NextRequest) {
  const authorization = req.headers.get('Authorization');
  if (!authorization) throw new Error('Unauthorized. Missing authorization header');

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) NextResponse.rewrite(new URL('/', req.url));

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.rewrite(new URL('/', req.url));
  }
}

const config = {
  matcher: ['/api/user/*'],
};

export { middleware, config };
