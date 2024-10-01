import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ValidationError } from '@utils/apiErrors';
import { generatePasswordHash, validateUUID, generateToken, validatePassword } from './authService';
import { secretKey, signOptions } from '@config/auth.config';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('validateUUID', () => {
  it('should not throw an error for a valid UUID', () => {
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';
    expect(() => validateUUID(validUUID)).not.toThrow();
  });

  it('should throw a ValidationError for an invalid UUID', () => {
    const invalidUUID = 'invalid-uuid';
    expect(() => validateUUID(invalidUUID)).toThrow(ValidationError);
    expect(() => validateUUID(invalidUUID)).toThrow('Invalid UUID');
  });

  it('should throw a ValidationError when UUID is empty', () => {
    expect(() => validateUUID('')).toThrow(ValidationError);
    expect(() => validateUUID('')).toThrow('Invalid UUID');
  });
});

describe('generateToken', () => {
  const mockSign = jwt.sign as jest.Mock;

  beforeEach(() => {
    mockSign.mockReset();
  });

  it('should generate a token when a valid userId is provided', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const token = 'generatedToken';
    mockSign.mockReturnValue(token);

    const result = generateToken(userId);

    expect(mockSign).toHaveBeenCalledWith({ userId }, secretKey, signOptions);
    expect(result).toBe(token);
  });

  it('should throw a ValidationError when no userId is provided', () => {
    expect(() => generateToken('')).toThrow(ValidationError);
    expect(() => generateToken('')).toThrow('User id is required to generate token');
  });

  it('should throw a ValidationError for an invalid UUID', () => {
    const invalidUUID = 'invalid-uuid';
    expect(() => generateToken(invalidUUID)).toThrow(ValidationError);
    expect(() => generateToken(invalidUUID)).toThrow('Invalid UUID');
  });
});

describe('validatePassword', () => {
  const mockCompare = bcrypt.compare as jest.Mock;

  beforeEach(() => {
    mockCompare.mockReset();
  });

  it('should return true when passwords match', async () => {
    const inputPassword = 'validPassword';
    const userPassword = 'hashedPassword';
    mockCompare.mockResolvedValue(true);

    const result = await validatePassword(inputPassword, userPassword);

    expect(mockCompare).toHaveBeenCalledWith(inputPassword, userPassword);
    expect(result).toBe(true);
  });

  it('should return false when passwords do not match', async () => {
    const inputPassword = 'validPassword';
    const userPassword = 'hashedPassword';
    mockCompare.mockResolvedValue(false);

    const result = await validatePassword(inputPassword, userPassword);

    expect(mockCompare).toHaveBeenCalledWith(inputPassword, userPassword);
    expect(result).toBe(false);
  });

  it('should throw a ValidationError when inputPassword is not provided', async () => {
    await expect(validatePassword('', 'hashedPassword')).rejects.toThrow(ValidationError);
    await expect(validatePassword('', 'hashedPassword')).rejects.toThrow(
      'Input password and user password are required to validate password'
    );
  });

  it('should throw a ValidationError when userPassword is not provided', async () => {
    await expect(validatePassword('validPassword', '')).rejects.toThrow(ValidationError);
    await expect(validatePassword('validPassword', '')).rejects.toThrow(
      'Input password and user password are required to validate password'
    );
  });

  it('should throw a ValidationError when both passwords are not provided', async () => {
    await expect(validatePassword('', '')).rejects.toThrow(ValidationError);
    await expect(validatePassword('', '')).rejects.toThrow(
      'Input password and user password are required to validate password'
    );
  });
});

describe('generatePasswordHash', () => {
  const mockHash = bcrypt.hash as jest.Mock;

  beforeEach(() => {
    mockHash.mockReset();
  });

  it('should generate a password hash when a valid password is provided', async () => {
    const password = 'validPassword';
    const hashedPassword = 'hashedPassword';
    mockHash.mockResolvedValue(hashedPassword);

    const result = await generatePasswordHash(password);

    expect(mockHash).toHaveBeenCalledWith(password, expect.any(Number));
    expect(result).toBe(hashedPassword);
  });

  it('should throw a ValidationError when no password is provided', async () => {
    await expect(generatePasswordHash('')).rejects.toThrow(ValidationError);
    await expect(generatePasswordHash('')).rejects.toThrow('Password is required to generate password hash');
  });
});
