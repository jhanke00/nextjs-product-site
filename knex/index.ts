import knex, { Knex } from 'knex';
import config from '@/knexfile';

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/knex/knex/issues/3788#issuecomment-679077458
 */
declare global {
  var __KNEX_DB_CONNECTION: Knex;
}

export function getKnex() {
  if (!global.__KNEX_DB_CONNECTION) {
    global.__KNEX_DB_CONNECTION = knex(config);
  }
  return global.__KNEX_DB_CONNECTION;
}
