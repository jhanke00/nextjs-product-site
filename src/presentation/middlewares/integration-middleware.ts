import { NextResponse, NextRequest } from 'next/server';
import { unauthorized } from '../helpers/http-helpers';

const INTEGRATION_TOKEN = process.env.INTEGRATION_TOKEN as string;

export class IntegrationMiddleware {
  async exec(request: NextRequest): Promise<NextResponse | null> {
    const bearerToken = request.headers.get('Authorization');
    const token = bearerToken?.split(' ')[1];

    const unauthorizedResponse = unauthorized();

    if (!token || token !== INTEGRATION_TOKEN) {
      return NextResponse.json(unauthorizedResponse, { status: unauthorizedResponse.statusCode });
    }

    return null;
  }
}
