# Endpoint: `/api/product`

## Description

This endpoint retrieves a list of all products, including details such as name, price, and stock availability. It is used to fetch all available products in the system.

## Method

- **GET**

## Parameters

- None.

## Response

- **Success**: Returns a list of all products.

  ```json
  [
    {
      "id": "product-id",
      "name": "product-name",
      "price": "35.00",
      "description": "product-description",
      "category": "product-category",
      "rating": 5,
      "numReviews": 80,
      "countInStock": 99
    },
    {
      "id": "product-id-2",
      "name": "product-name-2",
      "price": "78.00",
      "description": "product-description-2",
      "category": "product-category",
      "rating": 3,
      "numReviews": 20,
      "countInStock": 15
    }
  ]
  ```

## How It Works

This endpoint fetches all products from the data source (e.g., a database or a mock file). It returns an array of product objects, where each product contains details such as `id`, `name`, `price`, `description`, `category`, `rating`,`numReviews` e `countInStock`.

# Endpoint: `/api/product/[id]`

## Description

This endpoint retrieves detailed information about a specific product based on its unique `id`. The `id` is passed as a URL parameter in the path.

## Method

- **GET**

## Parameters

- `id` (required): The unique identifier of the product whose details are to be fetched.

## Response

- **Success**: Returns the details of the requested product.

  ```json
  {
    "id": "product-id",
    "name": "product-name",
    "price": "35.00",
    "description": "product-description",
    "category": "product-category",
    "rating": 5,
    "numReviews": 80,
    "countInStock": 99
  }
  ```

- **Error**: If the product with the specified ID is not found.

  ```json
  {
    "message": "Product not found"
  }
  ```

## How It Works

This endpoint fetches the product details from the data source (e.g., a database or a mock file) based on the provided `id`. If the product exists, its details will be returned.

# Endpoint: `/api/product/search`

## Description

This endpoint allows users to search for products based on a search query. The `q` parameter is used to filter products whose names start with the provided search term. The search is case-insensitive.

## Method

- **GET**

## Parameters

- `q` (required): The search term used to filter product names. The products whose names start with the provided term (case-insensitive) will be returned.

## Response

- **Success**: Returns a list of products whose names start with the search term.

  ```json
  [
    {
      "id": "product-id",
      "name": "product-name",
      "price": "35.00",
      "description": "product-description",
      "category": "product-category",
      "rating": 5,
      "numReviews": 80,
      "countInStock": 99
    },
    {
      "id": "product-id-2",
      "name": "product-name-2",
      "price": "78.00",
      "description": "product-description-2",
      "category": "product-category",
      "rating": 3,
      "numReviews": 20,
      "countInStock": 15
    }
  ]
  ```

- **Error**: If the `q` parameter is not provided or no products match the search term.

  ```json
  {
    "message": "Search term is required."
  }
  ```

- **No Products Found**: If no products match the search term.
  ```json
  {
    "message": "No products found matching the search term."
  }
  ```

## How It Works

This endpoint filters products by the search term passed in the `q` query parameter. The search is case-insensitive and only returns products whose names start with the provided term.
