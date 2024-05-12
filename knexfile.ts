import type { Knex } from 'knex';
import { loadEnvConfig } from '@next/env';

const dev = process.env.NODE_ENV !== 'production';
const env = loadEnvConfig('./', dev).combinedEnv;

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    port: Number(env.POSTGRES_PORT) || 5432,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './knex/migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
};

export default config;
