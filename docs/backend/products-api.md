# Getting Started

```
git clone https://github.com/your-username/your-repository.git
cd your-repository
pnpm dev
```

```
Create a .env file in the root directory of the project.

MONGODB_URI=mongodb://root:example@localhost:27017
DB_NAME=mydatabase
API_PORT=3000

```

Docker Setup

```
 docker-compose up --build
```

Verify that the containers are running:

```
 docker ps
```

To seed the database with product, order, user data, run the following command

```
 npx ts-node lib/script/seed.js

```

## Product API

- The API will be available at http://localhost:3000. You can use Postman.

  ```
    http://localhost:3000/api/products
  ```

- API for get Product by product id
  ```
   http://localhost:3000/api/products?id=id
  ```
- API for get Products by product name
  ```
   http://localhost:3000/api/products/search?query=Orient
  ```

## User API

- API For Get User by id with there orders
  ```
   http://localhost:3000/api/users?id=096a0233-30f4-4829-9a5c-5517893e776a
  ```

## Order API

- API for get all orders
  ```
   http://localhost:3000/api/orders
  ```
