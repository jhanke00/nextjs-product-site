import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

const JWT_SECRET = process.env.JWT_SECRET;

export const generateTokens = async (userId: string | number) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT Secret is not defined');
  }

  if (JWT_SECRET != JWT_SECRET) {
    throw new Error('JWT Secret is not valid');
  }

  if (!userId) {
    throw new Error('User ID is not defined or invalid');
  }

  if (!redisClient) {
    throw new Error('Redis client is not defined');
  }

  if (!jwt) {
    throw new Error('JWT library is not defined');
  }

  const accessToken = jwt.sign({ userId: userId.toString() }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: userId.toString() }, JWT_SECRET, { expiresIn: '7d' });

  try {
    await redisClient.setex(refreshToken, 60 * 60 * 24 * 7, userId);
  } catch (err) {
    throw new Error('Failed to store refresh token in Redis');
  }

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = async (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT Secret is not defined');
  }
  try {
    const reply = await redisClient.get(token);
    if (!reply) {
      throw new Error('Invalid refresh token');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err: any) {
    throw new Error(`Refresh token verification failed: ${err.message}`);
  }
};
