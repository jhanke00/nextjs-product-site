import { createMocks } from 'node-mocks-http';
import login from '../pages/api/auth/login';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(),
      },
    })),
  };
});

jest.mock('bcrypt');
jest.mock('../src/utils/tokenUtils');

const prisma = {
  user: {
    findUnique: jest.fn(),
  },
} as unknown as jest.Mocked<PrismaClient>;

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
  generateTokens: jest.fn(),
}));

describe('POST /api/auth/login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await login(req as any, res as any);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Use POST method.' });
  });

  it('should return 400 if email or password is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { email: '', password: '' },
    });

    await login(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'email and password are required' });
  });
});
