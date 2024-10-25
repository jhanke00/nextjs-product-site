import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { config } from 'dotenv';
import * as schema from './schema';

config({ path: '.env' });

export const db = drizzle(sql, { schema, logger: true });
