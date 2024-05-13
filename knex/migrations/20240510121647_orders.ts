import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', (table) => {
    table.string('orderId', 26).primary().notNullable();
    table.string('userId', 26).notNullable();
    table.decimal('total', 11, 2);
    table.timestamp('time');

    table.foreign('userId').references('users.userId');

    table.index('userId', 'orders_user_index');
    table.index('time', 'orders_time_index');
  });

  await knex.schema.createTable('order_products', (table) => {
    table.string('orderId', 26).notNullable();
    table.string('productId', 26).notNullable();
    table.integer('count').unsigned().notNullable();

    table.primary(['orderId', 'productId']);
    table.foreign('orderId').references('orders.orderId');
    table.foreign('productId').references('products.productId');

    table.index(['orderId', 'productId'], 'order_products_primary_index');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_products');
  await knex.schema.dropTable('orders');
}
