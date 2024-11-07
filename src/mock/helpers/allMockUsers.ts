import usersMockLarge from '@mock/large/users.json' assert { type: 'json' };
import usersMockSmall from '@mock/small/users.json' assert { type: 'json' };

export const allMockUsers = [...usersMockLarge, ...usersMockSmall];
