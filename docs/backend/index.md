# Changes Documentation

###### This document outlines the changes I made to the project according to some issues on GitHub. I focused on the backend issues.

I handle the large json files differently from the small json files.
They both have similiar endpoints but here are some main differences:

##### Large Json Files

For the large json mock files (users, products and orders) I populate them into a MongoDB, which I created a docker compose file on the root (docker-compose.yml) and a script file (scripts/popoulate-db.js) to populate all files into separate collections (User, Product and Order) using the mongodb dependency driver, which is more dinamic to use.

The User collection, I added a new field called `password`, which by default is the user firstName + the phoneNumber 3 last digits. The password is encrypted inside the database (using the bcrypt dependency).

I also created authentication functionality for users, where they can signup, login, change their passwords, view their orders (with pagination and sorting functionality) and how much they spent on orders. All this endpoints are protected with a JWT (Json Web Token) and I created a middleware file to handle the token verification (/src/utils/middlewares/authMiddleware.ts), which is sent on the Authorization header, and also I extended NextApiRequest to store the user id on every request (/src/customUserRequest.ts).

The signup, login and change password endpoints have validations using Yup dependency and sending the correct response to the client, so it can handle the fields validation the way it preferes.

I also created endpoints to view products (with pagination, sorting and filters) and to get a specific product details by id.

So all these endpoints, related to the large json files, are using mongoose dependency with separate Model files inside the models directory on the root.

##### Small Json Files

For the small json mock files I created endpoints very similar to the large json files, but there aren't any authentication functionality, so the user endpoints to view a specific user details or view a specific user orders are not protected.

I did like this just so the team can decide whats the best approach to follow: use json files or a database to handle the data.

##### Setup

1. Run `docker-compose up -d` to create an image of MongoDB.
2. Run `pnpm i` to install new dependencies (bcrypt, mongoose, mongodb, jsonwebtoken, yup).
3. Run `pnpm populate-db` to populate MongoDB with the large json files.
4. Run `pnpm dev` to test the api endepoints.

---

# API Documentation

> All theses endpoints are fetching data from MongoDB and using mongoose module. Imported from the mock large json files.

### 1. Get Products with Filtering, Pagination and Sorting

**Endpoint:** `/api/products`

**Method:** `GET`

**Query Parameters:**

- `search`: Text to search in product name, category, or description.
- `categories`: Comma-separated list of categories to filter by (e.g., `categories=Home,Games`).
- `minPrice`: Minimum price to filter products.
- `maxPrice`: Maximum price to filter products.
- `minRating`: Minimum rating to filter products.
- `maxRating`: Maximum rating to filter products.
- `page`: The current page for pagination (default is `1`).
- `limit`: The number of products to return per page (default is `10`).
- `sort`: The field to sort by (default is `name`).
- `order`: The sorting order, either `asc` or `desc` (default is `asc`).

**Description:**
Fetches products from MongoDB, applying filters for search text, categories, price range, rating range, pagination and sorting

**Example Request:**

```bash
curl -X GET /api/products
     -H "Content-Type: application/json"
```

```bash
curl -X GET /api/products?search=mordern&categories=Home&minPrice=20&maxPrice=100&page=1&limit=10&sort=name&order=asc \
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
    "products": [
        {
            "countOnStock": 0,
            "_id": "15d9fd26-4bd3-469c-8c87-39ba881d1ecc",
            "name": "Awesome Bronze Bacon",
            "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
            "category": "Jewelery",
            "rating": 1.0874778917059302,
            "numReviews": 13,
            "countInStock": 99,
            "price": 158
        },
        {...},
        {...},
        {...},
    ],
    "totalCount": 10000,
    "totalPages": 10000,
    "currentPage": 1
}
```

### 2. Get a Product by ID

**Endpoint:** `/api/products/[id]`

**Method:** `GET`

**Description:**
Fetches a single product based on its ID.

**Example Request:**

```bash
curl -X GET /api/products/7f074836-6dbb-458c-bf24-b70289b44ef1
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "countOnStock": 0,
  "_id": "15d9fd26-4bd3-469c-8c87-39ba881d1ecc",
  "name": "Awesome Bronze Bacon",
  "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  "category": "Jewelery",
  "rating": 1.0874778917059302,
  "numReviews": 13,
  "countInStock": 99,
  "price": 158
}
```

### 3. Get Product filters

**Endpoint:** `/api/products/filters`

**Method:** `GET`

**Description:**
Fetches filter ranges for the minimal and maimum price that is register on the Product collection, minimal and maximum Rating (1 to 5) and an array of unique categories sorted by name.

**Example Request:**

```bash
curl -X GET /api/products/filters
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "prices": {
    "min": "1",
    "max": "1000"
  },
  "ratings": {
    "min": 1,
    "max": 5
  },
  "categories": [
    "Automotive",
    "Baby",
    "Beauty",
    "Books",
    "Clothing",
    "Computers",
    "Electronics",
    "Games",
    "Garden",
    "Grocery",
    "Health",
    "Home",
    "Industrial",
    "Jewelery",
    "Kids",
    "Movies",
    "Music",
    "Outdoors",
    "Shoes",
    "Sports",
    "Tools",
    "Toys"
  ]
}
```

### 4. Signup User

**Endpoint:** `/api/auth/signup`

**Method:** `POST`

**Description:**
Creates a new user account.

**Example Request:**

```bash
curl -X POST /api/auth/signup
     -H "Content-Type: application/json"
     -d '{
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@domain.com",
            "phoneNumber": "+1 619 000 0000",
            "password": "123456"
         }'

```

**Example Response:**
<small>Status Code `201 CREATED`</small>

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@domain.com",
  "phoneNumber": "+1 619 000 0000",
  "_id": "ec3226ef-0243-4c4a-8c8b-589fbf89413a"
}
```

### 5. Login User

**Endpoint:** `/api/auth/login`

**Method:** `POST`

**Description:**
Authenticates a user and returns a token.

**Example Request:**

```bash
curl -X POST /api/auth/signup
     -H "Content-Type: application/json"
     -d '{
            "email": "john.doe@domain.com",
            "password": "123456"
         }'

```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "_id": "ec3226ef-0243-4c4a-8c8b-589fbf89413a",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@domain.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5NmEwMjMzLTMwZjQtNDgyOS05YTVjLTU1MTc4OTNlNzc2YSIsImlhdCI6MTcyNzM4ODg2MSwiZXhwIjoxNzI3OTkzNjYxfQ.2K7t6gVkUTPg28H9TwDw0dRjiM7Z-pwHH80az05SWkU"
}
```

### 6. Get Current User Details

**Endpoint:** `/api/me`

**Method:** `GET`

**Description:**
Retrieves details of the currently authenticated user.

**Example Request:**

```bash
curl -X GET /api/me
     -H "Content-Type: application/json"
     -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5NmEwMjMzLTMwZjQtNDgyOS05YTVjLTU1MTc4OTNlNzc2YSIsImlhdCI6MTcyNzM4ODg2MSwiZXhwIjoxNzI3OTkzNjYxfQ.2K7t6gVkUTPg28H9TwDw0dRjiM7Z-pwHH80az05SWkU" \
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@domain.com",
  "phoneNumber": "+1 619 000 0000",
  "_id": "ec3226ef-0243-4c4a-8c8b-589fbf89413a"
}
```

### 7. Get Current User Orders

**Endpoint:** `/api/me/orders`

**Method:** `GET`

**Query Parameters:**

- `page`: The current page for pagination (default is `1`).
- `limit`: The number of orders to return per page (default is `10`).
- `sort`: The field to sort by (default is `name`).
- `order`: The sorting order, either `asc` or `desc` (default is `asc`).

**Description:**
Retrieves orders details of the currently authenticated user with pagination and sorting.

**Example Request:**

```bash
curl -X GET /api/me/orders
     -H "Content-Type: application/json"
     -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5NmEwMjMzLTMwZjQtNDgyOS05YTVjLTU1MTc4OTNlNzc2YSIsImlhdCI6MTcyNzM4ODg2MSwiZXhwIjoxNzI3OTkzNjYxfQ.2K7t6gVkUTPg28H9TwDw0dRjiM7Z-pwHH80az05SWkU" \
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
    "orders": [
        {
            "_id": "7ac009a3-ae94-4aae-9a7b-aae14913befa",
            "total": 4198,
            "time": "2023-03-05T01:18:45.559Z",
            "items": [
                {
                    "_id": "66f6dc8f6d1531c9e5a2610c",
                    "id": "f7a5a67f-0661-40ab-aae3-54ca13d5fad3",
                    "name": "Tasty Bronze Towels",
                    "price": 870,
                    "count": 1
                },
                {
                    "_id": "66f6dc8f6d1531c9e5a2610d",
                    "id": "efc5583c-4d71-4171-811f-6188249ccbb9",
                    "name": "Handcrafted Metal Cheese",
                    "price": 832,
                    "count": 4
                }
            ]
        },
        {...},
        {...},
        {...}
    ],
    "totalCount": 52,
    "totalPages": 52,
    "currentPage": 1
}
```

### 8. Get Current User Orders Total Spent

**Endpoint:** `/api/me/orders/total`

**Method:** `GET`

**Description:**
Retrieves how much the currently authenticated user spent on orders.

**Example Request:**

```bash
curl -X GET /api/me/orders
     -H "Content-Type: application/json"
     -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5NmEwMjMzLTMwZjQtNDgyOS05YTVjLTU1MTc4OTNlNzc2YSIsImlhdCI6MTcyNzM4ODg2MSwiZXhwIjoxNzI3OTkzNjYxfQ.2K7t6gVkUTPg28H9TwDw0dRjiM7Z-pwHH80az05SWkU" \
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "totalSpent": 227321
}
```

### 9. Change Current User Password

**Endpoint:** `/api/me/password`

**Method:** `PUT`

**Description:**
Updates currently authenticated user password.

**Example Request:**

```bash
curl -X PUT /api/me/password
     -H "Content-Type: application/json"
     -d '{
            "currentPassword": "123456",
            "newPassword": "123123"
         }'

```

**Example Response:**
<small>Status Code `204 NO CONTENT`</small>

> All theses endpoints are fetching data directly from the mock small json files

### 1. Get Products with Filtering, Pagination and Sorting

**Endpoint:** `/api/small/products`

**Method:** `GET`

**Query Parameters:**

- `search`: Text to search in product name, category, or description.
- `categories`: Comma-separated list of categories to filter by (e.g., `categories=Home,Games`).
- `minPrice`: Minimum price to filter products.
- `maxPrice`: Maximum price to filter products.
- `minRating`: Minimum rating to filter products.
- `maxRating`: Maximum rating to filter products.
- `page`: The current page for pagination (default is `1`).
- `limit`: The number of products to return per page (default is `10`).
- `sort`: The field to sort by (default is `name`).
- `order`: The sorting order, either `asc` or `desc` (default is `asc`).

**Description:**
Fetches products from directly from small json files, applying filters for search text, categories, price range, rating range, pagination and sorting

**Example Request:**

```bash
curl -X GET /api/small/products
     -H "Content-Type: application/json"
```

```bash
curl -X GET /api/small/products?search=mordern&categories=Home&minPrice=20&maxPrice=100&page=1&limit=10&sort=name&order=asc \
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
    "products": [
        {
            "id": "c5aee834-a22a-4ea7-85ba-cc2033446b94",
            "name": "Electronic Cotton Keyboard",
            "price": 451,
            "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
            "category": "Games",
            "rating": 1.0914348100777715,
            "numReviews": 74,
            "countInStock": 64
        },
        {...},
        {...},
        {...},
    ],
    "totalCount": 50,
    "totalPages": 5,
    "currentPage": 1
}
```

### 2. Get a Product by ID

**Endpoint:** `/api/small/products/[id]`

**Method:** `GET`

**Description:**
Fetches a single product based on its ID.

**Example Request:**

```bash
curl -X GET /api/products/c5aee834-a22a-4ea7-85ba-cc2033446b94
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "id": "c5aee834-a22a-4ea7-85ba-cc2033446b94",
  "name": "Electronic Cotton Keyboard",
  "price": 451,
  "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  "category": "Games",
  "rating": 1.0914348100777715,
  "numReviews": 74,
  "countInStock": 64
}
```

### 3. Get Product filters

**Endpoint:** `/api/small/products/filters`

**Method:** `GET`

**Description:**
Fetches filter ranges for the minimal and maimum price that is register on the products.json file, minimal and maximum Rating (1 to 5) and an array of unique categories sorted by name.

**Example Request:**

```bash
curl -X GET /api/small/products/filters
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "prices": {
    "min": 16,
    "max": 998
  },
  "ratings": {
    "min": 1,
    "max": 5
  },
  "categories": [
    "Automotive",
    "Beauty",
    "Books",
    "Clothing",
    "Computers",
    "Electronics",
    "Games",
    "Garden",
    "Grocery",
    "Home",
    "Industrial",
    "Jewelery",
    "Kids",
    "Movies",
    "Music",
    "Shoes",
    "Sports",
    "Tools",
    "Toys"
  ]
}
```

### 4. Get a User by ID

**Endpoint:** `/api/small/users/[id]`

**Method:** `GET`

**Description:**
Fetches orders by a specific user id.

**Example Request:**

```bash
curl -X GET /api/small/users/24e1899b-101d-4580-acd8-70fc97c889a2
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "id": "24e1899b-101d-4580-acd8-70fc97c889a2",
  "firstName": "Meredith",
  "lastName": "O'Reilly",
  "phoneNumber": "(467) 651-1451 x721",
  "email": "Meredith_OReilly13@hotmail.com"
}
```

### 5. Get Single User Orders

**Endpoint:** `/api/small/users/[id]/orders`

**Method:** `GET`

**Query Parameters:**

- `page`: The current page for pagination (default is `1`).
- `limit`: The number of orders to return per page (default is `10`).
- `sort`: The field to sort by (default is `name`).
- `order`: The sorting order, either `asc` or `desc` (default is `asc`).

**Description:**
Retrieves orders of a specific user with pagination and sorting.

**Example Request:**

```bash
curl -X GET /api/small/users/24e1899b-101d-4580-acd8-70fc97c889a2/orders
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
    "orders": [
        {
            "items": [
                {
                    "id": "fe1d33a8-b6b9-403c-aa84-bc033973e0b1",
                    "name": "Practical Plastic Bike",
                    "price": "952.00",
                    "count": 3
                },
                {
                    "id": "3223f6f3-8456-4748-808e-7bade7fca2c2",
                    "name": "Luxurious Soft Fish",
                    "price": "737.00",
                    "count": 3
                },
                {
                    "id": "d7fe8e4c-6aae-4385-bd33-23720762d097",
                    "name": "Ergonomic Soft Shirt",
                    "price": "471.00",
                    "count": 3
                },
                {
                    "id": "7cd0d4f0-1bd8-4e4b-b030-ebac4a7e030d",
                    "name": "Licensed Wooden Car",
                    "price": "998.00",
                    "count": 3
                },
                {
                    "id": "bc2134da-814e-43c7-8306-a002c4e8913b",
                    "name": "Recycled Soft Pants",
                    "price": "482.00",
                    "count": 4
                }
            ],
            "total": 11402,
            "time": "2023-02-21T06:14:15.306Z"
        },
        {...},
        {...},
        {...}
    ],
    "totalCount": 5,
    "totalPages": 5,
    "currentPage": 1
}
```

### 6. Get User Orders Total Spent

**Endpoint:** `/api/users/[id]/orders/total`

**Method:** `GET`

**Description:**
Retrieves how much a specific user spent on orders.

**Example Request:**

```bash
curl -X GET /api/small/users/24e1899b-101d-4580-acd8-70fc97c889a2/orders/total
     -H "Content-Type: application/json"
```

**Example Response:**
<small>Status Code `200 OK`</small>

```json
{
  "totalSpent": 23112
}
```
