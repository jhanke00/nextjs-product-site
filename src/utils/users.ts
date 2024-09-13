import users from '@/src/mock/small/users.json';
import { User } from '@/src/type/users';

export class UserUtils {
  private users: User[];

  constructor() {
    this.users = users as User[];
  }

  public fetchUserById(userId: string): User {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error(`User with id: ${userId} not found.`);
    }

    return user;
  }
}
