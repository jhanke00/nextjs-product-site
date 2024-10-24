import { NextRequest, NextResponse } from 'next/server';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import { findUser } from '@/src/utils/db/user';
import { comparePassword, handleError, errorHandler } from '@/src/utils/helpers';
import { createJWT } from '@/src/utils/jwt';

YupPassword(yup);

type BodySchema = yup.InferType<typeof paramsSchema>;

export async function POST(request: NextRequest) {
  return processRequest(request).catch(errorHandler);
}

const processRequest = async (request: NextRequest) => {
  const { email, password } = await validateBody(request);

  const user = await findUser(email);

  if (!user || !comparePassword(password, user.password)) return handleError('Invalid email or password!');

  const token = createJWT(user.id);

  return NextResponse.json({ email, token });
};

const validateBody = async (req: NextRequest): Promise<BodySchema> => {
  if (!req) return handleError('Invalid request!');
  const body = await req.json();
  return paramsSchema.validate(body);
};

const paramsSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).minUppercase(1).minSymbols(1).maxRepeating(2).required(),
  })
  .required()
  .noUnknown(true);
