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
    table.specificType(
      'search',
      "text generated always as (coalesce(name, '') || ' ' || coalesce(description, '')) stored"
    );

    table.index('productId', 'products_primary_index');
  });
  await knex.raw('CREATE INDEX products_search_index ON products USING gin (search gin_trgm_ops)');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
