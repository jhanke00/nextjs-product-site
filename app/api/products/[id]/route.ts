import { makeFindProductByIdService } from '@/src/services/factories';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const response = await makeFindProductByIdService().exec(params.id);
  console.log({response});
  return NextResponse.json(response, {status: response.statusCode});
}
