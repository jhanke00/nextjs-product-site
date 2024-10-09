import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/auth/[id]';
import { PrismaClient, Prisma } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient), Prisma: jest.requireActual('@prisma/client').Prisma };
});

const prisma = new PrismaClient();

describe('API Handler Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and user data for GET request', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'User retrieved successfully', user: mockUser });
  });

  it('should return 404 if user not found for GET request', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const { req, res } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ message: 'User not found' });
  });

  it('should return 200 and updated user data for PUT request', async () => {
    const mockUpdatedUser = { id: 1, name: 'Updated User', email: 'updated@example.com', role: 'admin' };
    (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: { name: 'Updated User', email: 'updated@example.com', role: 'admin' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'User updated successfully', updatedUser: mockUpdatedUser });
  });

  it('should return 400 if there is a Prisma client known request error for PUT request', async () => {
    (prisma.user.update as jest.Mock).mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '2.0.0',
      })
    );

    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: { name: 'Updated User', email: 'updated@example.com', role: 'admin' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Prisma error: Unique constraint failed' });
  });

  it('should return 500 if there is an internal server error for PUT request', async () => {
    (prisma.user.update as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: { name: 'Updated User', email: 'updated@example.com', role: 'admin' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Internal server error: Database error' });
  });

  it('should return 200 for DELETE request', async () => {
    (prisma.user.delete as jest.Mock).mockResolvedValue({});

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: '1' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'User deleted successfully' });
  });

  it('should return 400 if there is a Prisma client known request error for DELETE request', async () => {
    (prisma.user.delete as jest.Mock).mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Foreign key constraint failed', {
        code: 'P2003',
        clientVersion: '2.0.0',
      })
    );

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: '1' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({ message: 'Prisma error: Foreign key constraint failed' });
  });

  it('should return 500 if there is an internal server error for DELETE request', async () => {
    (prisma.user.delete as jest.Mock).mockRejectedValue(new Error('Database error'));

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: '1' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Internal server error: Database error' });
  });
});
