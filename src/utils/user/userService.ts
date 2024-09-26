import { User } from '@/src/type/users';
import users from '@mock/small/users.json';
import { NotFoundError, ValidationError } from '@utils/apiErrors';

// TODO: it should be moved to a common place
function isUUID(value: string) {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(value);
}

function validateUUID(value: string) {
  if (!isUUID(value)) throw new ValidationError('Invalid UUID');
}

async function getUserById(userId: string): Promise<User> {
  validateUUID(userId);
  const user = users.find((user) => user.id === userId);
  if (!user) throw new NotFoundError('User not found');
  return user;
}

export { getUserById };
