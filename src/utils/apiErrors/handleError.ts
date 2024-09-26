import { NextRequest, NextResponse } from 'next/server';
import { NotFoundError, ValidationError } from '@utils/apiErrors';

function handleError(req: NextRequest, error: any) {
  if (error instanceof NotFoundError) {
    return NextResponse.json({ success: false, message: error.message }, { status: 404 });
  }

  if (error instanceof ValidationError) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }

  console.error(error, `\n[Unexpected error] ${error.message}: ${req.url}`);

  return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
}

export { handleError };
