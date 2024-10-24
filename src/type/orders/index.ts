import { itemsTable, ordersTable } from '@/infra/db/schema';

export type Order = typeof ordersTable.$inferSelect;
export type NewOrder = typeof ordersTable.$inferInsert;
export type Item = typeof itemsTable.$inferSelect;
export type NewItem = typeof itemsTable.$inferInsert;
