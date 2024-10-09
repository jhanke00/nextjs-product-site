# Backend
Backend API documentation.

## Products API

### Product JSON example
```
{
  "id": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
  "name": "Recycled Fresh Chicken",
  "price": "758.00",
  "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
  "category": "Electronics",
  "rating": 4.4676501920912415,
  "numReviews": 98,
  "countInStock": 93
}
```

### 1. `GET - /api/products`
Get a list of all available products.
#### Response:
- **HTTP Status Code**: `200`
  - Returns an array of JSON objects containing a list of product details.
#### Errors:
- **HTTP Status Code**: `405`
  - Method not allowed.

### 2. `GET /api/products/{id}`
Get a single product by id.
### Request parameters
- **`id`** (required): Product id (string).
### Request example
`GET - /api/products/bf0c09a7-dfdc-4755-8e79-bb56725c94cf`
#### Response:
- **HTTP Status Code**: `200`
  - Returns a JSON object containing the product details.
#### Errors:
- **HTTP Status Code**: `404`
  - Not found - In case of a invalid product id.
- **HTTP Status Code**: `405`
  - Method not allowed.

### 3. `GET /api/products/query`
Get a list of products based on the query parameters.
### Query parameters
At least one of the following query parameters is required:
- **`name`**: Product name.
- **`description`**: Product description.
- **`category`**: Product category.
### Request example
`GET - /api/products/query?name=recycled&category=eletronics`
#### Response:
- **HTTP Status Code**: `200`
  - Returns an array of JSON objects containing the filtered list of product details.
#### Errors:
- **HTTP Status Code**: `400`
  - Bad request - In case of not informed request parameters.
- **HTTP Status Code**: `405`
  - Method not allowed.
