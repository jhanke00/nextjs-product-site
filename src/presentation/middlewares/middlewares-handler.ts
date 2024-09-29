import { NextRequest, NextResponse } from 'next/server';

export function middlewaresHandler(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  ...middlewares: Array<{ exec: (request: NextRequest) => Promise<NextResponse | NextRequest | null> }>
) {
  return async (request: NextRequest, ...handlerArgs: any[]) => {
    let modifiedRequest = request;

    for (const middleware of middlewares) {
      const result = await middleware.exec(modifiedRequest);
      if (result instanceof NextResponse) {
        return result;
      }
      if (result) {
        modifiedRequest = result;
      }
    }

    return handler(modifiedRequest, ...handlerArgs);
  };
}
