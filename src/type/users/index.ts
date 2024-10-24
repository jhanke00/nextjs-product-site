import { usersTable } from '@/infra/db/schema';

export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;
