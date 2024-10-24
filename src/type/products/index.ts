import { productsTable } from '@/infra/db/schema';

export type NewProduct = typeof productsTable.$inferInsert;
export type Product = typeof productsTable.$inferSelect;
