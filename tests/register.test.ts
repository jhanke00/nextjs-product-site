import { createMocks } from 'node-mocks-http';
import register from '../pages/api/auth/register';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe('POST /api/auth/register', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await register(req as any, res as any);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: 'Method not allowed' });
  });

  it('should return 400 if user already exists', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'seu_email@example.com' });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Seu Nome',
        email: 'seu_email@example.com',
        password: 'sua_senha',
      },
    });

    await register(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'User already exists with this email.' });
  });

  it('should return 201 if user is successfully registered', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    (jest.spyOn(bcrypt, 'hash') as jest.Mock).mockResolvedValue('hashedpassword');
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: 'user',
      createdAt: new Date(),
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'Test User', email: 'test@example.com', password: 'password123' },
    });

    await register(req as any, res as any);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({
      message: 'User registered successfully.',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  });

  it('should return 500 if there is a server error', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'Test User', email: 'test@example.com', password: 'password123' },
    });

    await register(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Error registering user.', error: 'Database error' });
  });
});
