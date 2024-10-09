import { PrismaClient } from '@prisma/client';
import { getUserById } from '../src/utils/getUserById';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('getUserById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve a user by ID', async () => {
    const mockUser = { id: 1, name: 'Luis' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUserById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockUser);
  });

  it('should return null if user is not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getUserById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toBeNull();
  });
});
