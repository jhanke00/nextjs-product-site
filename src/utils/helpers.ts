import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';

import { CustomError } from '@/src/utils/custom-error';

import { ValidateJWTType, validateJWT } from '@/src/utils/jwt';
import { getUser } from '@/src/utils/db/user';
import { HttpRequestStatus } from '@/src/type/http';

export const handleError = (message: string, statusCode?: number) => {
  throw new CustomError(message, statusCode ?? HttpRequestStatus.BAD_REQUEST);
};

export const errorHandler = (error: CustomError) => {
  if (error.message.match(/prisma/gi))
    return NextResponse.json({ error: 'Something went wrong, try again!' }, { status: HttpRequestStatus.BAD_REQUEST });
  return NextResponse.json({ error: error.message }, { status: error.statusCode ?? HttpRequestStatus.BAD_REQUEST });
};

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword);

export const generateHashedPassword = (password: string) => bcrypt.hashSync(password, 10);

export const checkAuthorization = (request: NextRequest) => {
  const authorization = request.headers.get('Authorization');
  if (!authorization) return handleError('Missing Authorization!');
  return authorization;
};

export const validateToken = (authorization: string): ValidateJWTType => {
  const isTokenValid = validateJWT(authorization);
  if (!isTokenValid) return handleError('Invalid Authorization token provided!');

  return isTokenValid;
};

export const authMiddleware = async (request: NextRequest): Promise<{ user: User }> => {
  const authorization = checkAuthorization(request);

  const validatedToken = validateToken(authorization);

  const user = await getUser(validatedToken.id);
  if (!user) return handleError('User not found!');

  return { user };
};
