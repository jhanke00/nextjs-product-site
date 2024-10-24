import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization, errorHandler, validateToken } from '@/src/utils/helpers';

export async function GET(request: NextRequest) {
  return processRequest(request).catch(errorHandler);
}

const processRequest = async (request: NextRequest) => {
  const authorization = checkAuthorization(request);
  validateToken(authorization);
  return NextResponse.json({ status: 'ok' });
};
