import { getUserById } from './userService';
import users from '@mock/small/users.json';
import { NotFoundError, ValidationError } from '@utils/apiErrors';

describe('getUserById', () => {
  it('should return the user when a valid UUID is provided', async () => {
    const validUserId = users[0].id;
    const user = await getUserById(validUserId);
    expect(user).toEqual(users[0]);
  });

  it('should throw a ValidationError when an invalid UUID is provided', async () => {
    const invalidUserId = 'invalid-uuid';
    await expect(getUserById(invalidUserId)).rejects.toThrow(ValidationError);
  });

  it('should throw a NotFoundError when a non-existent UUID is provided', async () => {
    const nonExistentUserId = '123e4567-e89b-12d3-a456-426614174000';
    await expect(getUserById(nonExistentUserId)).rejects.toThrow(NotFoundError);
  });
});
