import { NextRequest, NextResponse } from 'next/server';

export function middlewaresHandler(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  ...middlewares: Array<{ exec: (request: NextRequest) => Promise<NextResponse | null> }>
) {
  return async (request: NextRequest, ...handlerArgs: any[]) => {
    for (const middleware of middlewares) {
      const result = await middleware.exec(request);
      if (result) {
        return result;
      }
    }

    return handler(request, ...handlerArgs);
  };
}
