/* eslint-disable no-unused-vars */
import { seedData } from '@/scripts/seed-data';
import { makeIntegrationMiddleware } from '@/src/presentation/factory/middlewares/integration-middleware-factory.ts';
import { middlewaresHandler } from '@/src/presentation/middlewares';
import { NextRequest, NextResponse } from 'next/server';

async function seedHandler(request: NextRequest) {
  const response = await seedData();
  return NextResponse.json({
    response,
  });
}

export const POST = async (request: NextRequest) => {
  return middlewaresHandler(seedHandler, makeIntegrationMiddleware())(request);
};
