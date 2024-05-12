import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.string('productId', 26).primary().notNullable();
    table.text('name').notNullable();
    table.decimal('price', 11, 2).notNullable();
    table.text('description');
    table.text('category');
    table.decimal('rating', null);
    table.integer('numReviews');
    table.integer('countInStock');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
