# Database

The current setup of the project will load all data in memory from storage files. In order to build new features in the backend, a database will be set up so that the application can scale to larger datasets and more complex queries while improving the performance.

## This solution

We choose to use PostgreSQL as a full featured production ready database that meets our needs, and since this is a next.js project we can leverage a Vercel PostgreSQL deployment. On top of it, we also choose to use Drizzle as an ORM to interact with the database offering a good developer experience and performance.

## Setup

To run the project locally, you need to create a database instance in Vercel and set the environment variables in the `.env` file. To create a database, follow these steps:

1. Go to the Vercel dashboard and select the project. You can create a new project and import this repository from github if you do not already have one.
2. Go to the `Storage` tab and click on 'Create Database'
3. Select the 'Postgres' option
4. Follow the steps to set up the database
5. Once created, go to the `.env.local` tab under the quickstart section
6. Copy the snippet and paste it in the `.env` file

Once the `.env` file is populated, you can set up the db with this command:

```bash
pnpm run db:migrate
```

## Commands

- `pnpm run db:generate`: Generate a migration based on the changes to `infra/db/schema.ts`
- `pnpm run db:migrate`: Migrate the database to the latest version
- `pnpm run db:studio`: Open the database studio to interact with the database
