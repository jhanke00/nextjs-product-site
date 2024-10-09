import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import { generateTokens, verifyRefreshToken } from '../src/utils/tokenUtils';

jest.mock('ioredis');
jest.mock('jsonwebtoken');

const mockedRedisClient = Redis as jest.MockedClass<typeof Redis>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('Auth Module', () => {
  const userId = '123';

  beforeAll(() => {
    process.env.JWT_SECRET = 'secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateTokens', () => {
    it('should have JWT_SECRET defined', () => {
      expect(process.env.JWT_SECRET).toBeDefined();
    });

    it('should throw error if JWT_SECRET is not defined', async () => {
      const originalJwtSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      await expect(generateTokens(userId)).rejects.toThrow('JWT Secret is not defined');
      process.env.JWT_SECRET = originalJwtSecret;
    });
  });

  describe('verifyRefreshToken', () => {
    const token = 'someRefreshToken';

    beforeEach(() => {
      mockedRedisClient.prototype.get = jest.fn().mockResolvedValue(userId);
      mockedJwt.verify.mockImplementation((token, secret) => {
        return { userId: '123' };
      });
    });

    it('should throw error if refresh token is invalid', async () => {
      mockedRedisClient.prototype.get = jest.fn().mockResolvedValue(null);
      await expect(verifyRefreshToken(token)).rejects.toThrow('Invalid refresh token');
    });

    it('should throw error if JWT_SECRET is not defined', async () => {
      delete process.env.JWT_SECRET;
      await expect(verifyRefreshToken(token)).rejects.toThrow('JWT Secret is not defined');
    });
  });
});
