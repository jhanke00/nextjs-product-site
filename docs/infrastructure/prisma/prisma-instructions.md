# Prisma

Check if you have the `prisma.schema` in `prisma` folder. If not, use the command `pnpm prisma init` to create `prisma/prisma.schema`.

Follow the steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, [read](https://pris.ly/d/getting-started).
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events, clicking [here](https://pris.ly/cli/beyond-orm).

Make sure to check if you have `@prisma/client` installed.

## .env

Your `.env` file must be like this:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

You need to change some fields to run the docker container:

1. Where is **johdoe:randompassword** you must enter the username and password that are in the file [docker-compose.yml](./../../../infra/docker-compose.yml).
2. Where is **mydb** you must enter the **container_name** which is also in the file [docker-compose.yml](./../../../infra/docker-compose.yml).
3. Where is **postgresql** you must change to **mongodb** and change the localhost to **27017**.
4. Add **?authSource=admin&directConnection=true** after the **container_name**.
5. Check the `.env.local` to check how it should look.

## schema.prisma

If you don't have the `schema.prisma` file, you need to put the code below:

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  firstName   String
  lastName    String
  phoneNumber String
  email       String  @unique
  orders      Order[]
}

model Product {
  id           String      @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  price        Float
  description  String
  category     String
  rating       Float       @default(0)
  numReviews   Int         @default(0)
  countInStock Int         @default(0)
  items        OrderItem[]
}

model Order {
  id     String   @id @default(auto()) @map("_id") @db.ObjectId
  userId String   @db.ObjectId
  total  Float
  time   DateTime @default(now())

  user  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  items OrderItem[]
}

model OrderItem {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  productId String  @db.ObjectId
  count     Int
  orderId   String? @db.ObjectId
  price     Float

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  Order   Order?  @relation(fields: [orderId], references: [id], onDelete: Cascade)
}
```

After that, run the command `pnpm prisma generate`.
Your database is now set, and you can use the command `pnpm prisma studio` to view the database.

## Seed

To make the seed you have to check if you have the code below in `package.json` file:

```js
"name": "next-product-site",
"version": "0.1.0",
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

After the you can run the command `pnpm prisma db seed` to populate the database with the small mock data. To seed the data, I used a _utility function_ to convert `uuid` to `ObjectId` in **id** fields.
