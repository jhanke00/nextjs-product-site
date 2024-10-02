import { NextRequest, NextResponse } from 'next/server';
import type { ApiError } from './errorMessages';

function handleError(req: NextRequest, error: any) {
  const isApiError = error instanceof Error && 'statusCode' in error;
  if (isApiError) {
    const apiError = error as ApiError;
    return NextResponse.json({ success: false, message: error.message }, { status: apiError.statusCode });
  }

  console.error(error, `\n[Unexpected error] ${error.message}: ${req.url}`);

  return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
}

export { handleError };
