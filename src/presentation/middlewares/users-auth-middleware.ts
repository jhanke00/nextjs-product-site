import { NextResponse, NextRequest } from 'next/server';
import { unauthorized } from '../helpers/http-helpers';
import { IAuthenticator } from '@/src/domain/authenticators/authenticator';

export class AuthMiddleware {
  private readonly authenticator: IAuthenticator;

  constructor(authenticator: IAuthenticator) {
    this.authenticator = authenticator;
  }

  async exec(request: NextRequest): Promise<NextRequest | NextResponse | null> {
    const bearerToken = request.headers.get('Authorization');
    const token = bearerToken?.split(' ')[1];

    const unauthorizedResponse = unauthorized();

    if (!token) {
      return NextResponse.json(unauthorizedResponse, { status: unauthorizedResponse.statusCode });
    }

    try {
      const { isValid, data } = await this.authenticator.verifyToken<{ email: string }>(token);

      if (!isValid) {
        return NextResponse.json(unauthorizedResponse, { status: unauthorizedResponse.statusCode });
      }

      const modifiedRequest = new NextRequest(request.url, {
        headers: {
          ...Object.fromEntries(request.headers),
          'x-user-email': data.email,
        },
      });

      return modifiedRequest;
    } catch (error) {
      return NextResponse.json(unauthorizedResponse, { status: unauthorizedResponse.statusCode });
    }
  }
}
