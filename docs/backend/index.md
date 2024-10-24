# Backend

# 1 - Auth

## 1.1 - User Registration Route `(/signup)`

This route handles user registration by creating a new user with the provided details and returning a JWT token upon successful registration.

### Method: `POST`

Example request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "123-456-7890",
  "password": "StrongPass@123"
}
```

Example response body:

```json
{
  "email": "john.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMTM3NTJiZjhlMGFiNWRhZWNjMjZlNSIsImlhdCI6MTcyOTc3Njc5MiwiZXhwIjoxNzMwMzgxNTkyfQ. kn9GrPLKX_VRHQFiD87CtI91C4fDONY8SuKvSthQyMk"
}
```

## 1.2 - Authentication Route `(/signin)`

This route handles user authentication by verifying the provided email and password and returning a JWT token if the credentials are valid.

### Method: `POST`

Example request body:

```json
{
  "email": "user@example.com",
  "password": "StrongPass@123"
}
```

Example response body:

```json
{
  "email": "Jerome.Hessel@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMTM3NTJiZjhlMGFiNWRhZWNjMjZlNSIsImlhdCI6MTcyOTc3Njc5MiwiZXhwIjoxNzMwMzgxNTkyfQ. kn9GrPLKX_VRHQFiD87CtI91C4fDONY8SuKvSthQyMk"
}
```

## 1.3 - Token Validation Route `(/verify)`

This route checks for the presence of an authorization token in the request and validates it. If the token is valid, the route returns a success response.

### Method: `GET`

Example response body:

#### Success

```json
{
  "status": "ok"
}
```

#### Error

```json
{
  "error": "Invalid Authorization token provided!"
}
```

# 2 - Products

## 2.1 - Products Route `(/products)`

This route retrieves a list of products based on various search parameters, including sorting, filtering and pagination.

### Method: `GET`

### Query Parameters

| Parameter  | Type   | Description                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `sort`     | string | The field to sort by (options: `name`, `price`, `rating`, `countInStock`, `numReviews`). Defaults to `name`. |
| `order`    | string | The order of sorting (options: `asc`, `desc`). Defaults to `asc`.                                            |
| `search`   | string | A search term to filter products by name or description.                                                     |
| `minPrice` | number | The minimum price of the products (must be >= 0). Defaults to `0`.                                           |
| `maxPrice` | number | The maximum price of the products (must be <= 1,000,000,000). Defaults to `1,000,000,000`.                   |
| `page`     | number | The page number for pagination (must be >= 1). Defaults to `1`.                                              |
| `limit`    | number | The number of products to return per page (must be between `1` and `100`). Defaults to `20`.                 |

Example request url:
`/api/products?sort=price&order=asc&search=apple&minPrice=0&maxPrice=100&page=1&limit=20`

Example response body:

```json
{
  "products": [
    {
      "id": "e6252e760fdd47cef9b37d3d",
      "name": "Awesome Bronze Ball",
      "price": 174,
      "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      "rating": 0.6142320286016911,
      "numReviews": 7,
      "countInStock": 13,
      "category": "Baby"
    }
  ]
}
```

## 2.2 - Product Retrieval Route `(/products/[id])`

This route retrieves a specific product details based on the provided product ID.

### Method: `GET`

### URL Parameters

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| `id`      | string | The ID of the product to retrieve (must be a valid ObjectId). |

Example response body:

```json
{
  "product": {
    "id": "e6252e760fdd47cef9b37d3d",
    "name": "Awesome Bronze Ball",
    "price": 174,
    "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    "rating": 0.6142320286016911,
    "numReviews": 7,
    "countInStock": 13,
    "category": "Baby"
  }
}
```

#### Error

```json
{
  "error": "Invalid productId!"
}
```

```json
{
  "error": "Product not found!"
}
```

# 3 - Products

## 3.1 - User Info Route `(/user)`

This route retrieves the details of the authenticated user, excluding sensitive information such as the password.

### Method: `GET`

Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMTM3NTJiZjhlMGFiNWRhZWNjMjZlNSIsImlhdCI6MTcyOTc3Njc5MiwiZXhwIjoxNzMwMzgxNTkyfQ.kn9GrPLKX_VRHQFiD87CtI91C4fDONY8SuKvSthQyMk"
}
```

Example response body:

```json
{
  "id": "0013752bf8e0ab5daecc26e5",
  "firstName": "Jerome",
  "lastName": "Hessel",
  "phoneNumber": "948.637.4758 x4018",
  "email": "Jerome.Hessel@gmail.com"
}
```

## 3.2 - User Orders Route `(/user/orders)`

This route retrieves a list of orders for the authenticated user.

## Method: `GET`

Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMTM3NTJiZjhlMGFiNWRhZWNjMjZlNSIsImlhdCI6MTcyOTc3Njc5MiwiZXhwIjoxNzMwMzgxNTkyfQ.kn9GrPLKX_VRHQFiD87CtI91C4fDONY8SuKvSthQyMk"
}
```

Example response body:

```json
{
  "orders": [
    {
      "id": "671a464f424df5aa859d0432",
      "total": 5114,
      "time": "2023-12-21T12:18:15.790Z",
      "products": [
        {
          "count": 4,
          "name": "Sleek Bronze Ball",
          "price": 551,
          "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
        },
        {
          "count": 4,
          "name": "Bespoke Metal Pizza",
          "price": 118,
          "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"
        },
        {
          "count": 2,
          "name": "Generic Wooden Salad",
          "price": 354,
          "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
        },
        {
          "count": 1,
          "name": "Intelligent Plastic Bacon",
          "price": 770,
          "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
        },
        {
          "count": 3,
          "name": "Small Steel Car",
          "price": 320,
          "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit"
        }
      ]
    }
  ]
}
```

## 3.3 - User Orders Total Spent Route `(/user/orders/spent)`

This route calculates the total amount spent by the user across all their orders.

## Method: `GET`

Example response body:

```json
{
  "amount": 202150
}
```

## Subjects I Wish to Explore but Haven't Yet Found the Time For

Issues with Type Definitions in Some Database Requests.

The execution time for the seed process exceeds my expectations.
