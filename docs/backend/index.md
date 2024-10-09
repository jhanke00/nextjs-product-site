# Backend

Backend API documentation.

## Products API

### Product JSON example

```
{
    "id": "a4dcbef2-e76b-4c87-8917-594100f8a874",
    "name": "Oriental Rubber Tuna",
    "price": "211.00",
    "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    "category": "Games",
    "rating": 1.0831935238093138,
    "numReviews": 57,
    "countInStock": 29
}
```

### 1. `GET - /api/products`

Get a list of all available products.

#### Response:

- **HTTP Status Code**: `200`
  - Returns an array of JSON objects containing a list of product details.

### Pagination

Get a paginated list of products based on the query parameters.

### Query parameters

At least one of the following query parameters is required:

- **`page`**: Page Number.
- **`size`**: Page items Size.

### Request example

`GET /api/products?page=1&size=20`

### 2. `GET /api/products/{id}`

Get a single product by id.

### Request parameters

- **`id`** (required): Product id (string).

### Request example

`GET - /api/products/a4dcbef2-e76b-4c87-8917-594100f8a874`

#### Response:

- **HTTP Status Code**: `200`
  - Returns a JSON object containing the product details.
