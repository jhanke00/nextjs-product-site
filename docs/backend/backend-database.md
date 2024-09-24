# backend database

A mongodb database to be used instead of json files for products data.

## setup

**obs:** this is not a production ready setup, it is only meant to be used for local development.
**obs:** _requires_ docker and docker compose

1. Start the mongodb container

```bash
docker-compose up -d
```

2. Seed the database

```bash
pnpm seed-mongodb
```

3. Run the application normally

```bash
pnpm dev
```

4. Verify that the products and product details pages are working as expected

## what was implemented

- a prisma client to interact with the database
- a prisma schema to define the database structure
- a seed script to seed the database with data
- an api route to fetch the full product list
- an api route to fetch a single product
- basic caching for both routes
- modification in the products and product detail pages to use the api routes

## what should be implemented in following features

- pagination for the product list on the backend
- better caching using redis or a similar solution
