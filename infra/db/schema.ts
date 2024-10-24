import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const timestamps = () => ({
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Users
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  email: text('email').notNull(),
  ...timestamps(),
});

// Products
export const productsTable = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  rating: integer('rating'),
  numReviews: integer('num_reviews').default(0),
  countInStock: integer('count_in_stock').notNull(),
  ...timestamps(),
});

// Orders
export const ordersTable = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'restrict' }),
  total: integer('total').notNull(),
  time: timestamp('time').notNull().defaultNow(),
  ...timestamps(),
});

export const itemsTable = pgTable('items', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'restrict' }),
  orderId: integer('order_id')
    .notNull()
    .references(() => ordersTable.id, { onDelete: 'cascade' }),
  price: integer('price').notNull(),
  count: integer('count').notNull(),
  ...timestamps(),
});
