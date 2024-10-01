import { User } from '@type/users';
import users from '@mock/small/users.json';
import { NotFoundError } from '@utils/apiErrors';
import { validateUUID } from '@utils/auth/authService';

async function getUserById(userId: string): Promise<User> {
  validateUUID(userId);
  const user = users.find((user) => user.id === userId);
  if (!user) throw new NotFoundError('User not found');
  return user;
}

export { getUserById };
