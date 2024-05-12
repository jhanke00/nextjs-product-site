import { Knex } from 'knex';
import smallUserData from '../../src/mock/small/users.json';
import largeUserData from '../../src/mock/large/users.json';
import { UlidMonotonic } from 'id128';
import { writeFileSync } from 'fs';

const createUserIdMap = (users: typeof smallUserData) => {
  const uidToUlidMap: Record<string, string> = {};
  users.forEach((user) => {
    uidToUlidMap[user.id] = UlidMonotonic.generate().toCanonical();
  });

  writeFileSync('knex/seeds/user_id_map.json', JSON.stringify(uidToUlidMap, null, 2));

  return uidToUlidMap;
};

export async function seed(knex: Knex): Promise<void> {
  const data = [...largeUserData, ...smallUserData];
  const idMap = createUserIdMap(data);

  await knex('users').del();
  await knex('users').insert(
    data.map((user) => ({
      userId: idMap[user.id],
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }))
  );
}
