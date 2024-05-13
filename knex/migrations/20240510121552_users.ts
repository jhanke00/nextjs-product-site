import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('userId', 26).primary().notNullable();
    table.text('firstName').notNullable();
    table.text('lastName').notNullable();
    table.text('email').unique().notNullable();
    table.text('phoneNumber');
    table.specificType(
      'search',
      "text generated always as (coalesce(\"firstName\", '') || ' ' || coalesce(\"lastName\", '') || ' ' || coalesce(email, '')) stored"
    );

    table.index('userId', 'users_primary_index');
    table.index(['firstName', 'lastName'], 'users_name_index');
  });
  await knex.raw('create index users_search_index on users using gin (search gin_trgm_ops)');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
