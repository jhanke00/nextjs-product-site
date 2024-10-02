import { ValidationError } from '@utils/apiErrors';
import { generatePasswordHash, validateUUID, generateToken, validatePassword } from './authService';

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
  it('should throw a ValidationError when no password is provided', async () => {
    await expect(generatePasswordHash('')).rejects.toThrow(ValidationError);
    await expect(generatePasswordHash('')).rejects.toThrow('Password is required to generate password hash');
  });
});
