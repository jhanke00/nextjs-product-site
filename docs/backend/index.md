# Backend

---

## Table of Contents

- [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Product API - Backend Implementation](#product-api---backend-implementation)
    - [Overview](#overview)
      - [Data Flow and Architecture](#data-flow-and-architecture)
      - [Mock Data Integration](#mock-data-integration)
    - [Endpoints](#endpoints)
      - [1. Get Product List](#1-get-product-list)
      - [2. Get Product by ID](#2-get-product-by-id)
      - [3. Search Product](#3-search-product)

---

## Product API - Backend Implementation

This documentation provides an overview of the backend implementation for the **ProductController**, which handles requests related to products in the system. The controller interacts with the `ProductService` to retrieve product data, including small product lists, individual product details, and product searches.

### Overview

The `ProductController` is responsible for handling HTTP requests related to products. It provides three main endpoints:

- Fetching a paginated list of small products.
- Retrieving a small product by its ID.
- Searching for products by a query string.

#### Data Flow and Architecture

The `ProductController` relies on a layered architecture to handle requests efficiently. The flow from the controller to the data layer is structured as follows:

1. **ProductController**: Handles the incoming HTTP requests, validates input, and sends appropriate responses.
2. **ProductService**: Contains the business logic for managing products. It processes data according to business rules and interacts with the repository layer.
3. **ProductRepository**: Implements the data layer, responsible for fetching and manipulating product data. In this setup, the repository connects to mock data stored in JSON files, simulating interactions with a database.

#### Mock Data Integration

The `ProductRepository` interacts with mock data stored in JSON files. These files serve as a placeholder for a real database and contain the product information. The repository layer handles:

- **Fetching product lists** from the JSON data, applying pagination as needed.
- **Retrieving a single product** by its ID.
- **Performing search operations** on the mock data to return products matching a query.

By using mock data, the repository simulates database queries, allowing the system to be tested and developed without needing a live database connection. This setup ensures that the business logic and the controller can be fully functional and tested in isolation from the actual data storage system.

Each method in the `ProductController` interacts with the `ProductService`, which in turn calls the `ProductRepository` to fetch or manipulate data. Finally, the controller formats and returns the result as a JSON response.

### Endpoints

#### 1. Get Product List

**Endpoint:** `GET /products/dataset/:dataset`

This endpoint retrieves a paginated list of products according dataset.

- **Query Parameters:**
  - `page` (optional): The page number for pagination. Defaults to `1` if not provided.
  - `limit` (optional): The number of products per page. Defaults to `10` if not provided.

**Example Request:**

```http
GET /products/dataset/large?page=1&limit=10
```

**Example Response:**

```json
{
  "products": [
    {
      "id": "1",
      "name": "Product A",
      "price": "211.00",
      "description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
      "category": "Games",
      "rating": 1.0831935238093138,
      "numReviews": 57,
      "countInStock": 29
    },
    {
      "id": "2",
      "name": "Product B",
      "price": "82.00",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

#### 2. Get Product by ID

**Endpoint:** `GET /products/:id/dataset/:dataset`

This endpoint retrieves the details of a small product by its `id`.

- **Path Parameters:**
  - `id`: The ID of the product to retrieve.

**Example Request:**

```http
GET /products/1/dataset/small
```

**Example Response:**

```json
{
  "id": "1",
  "name": "Product A",
  "price": "211.00",
  "description": "Boston's most advanced compression wear technology increases muscle oxygenationstabilizes active muscles",
  "category": "Games",
  "rating": 1.0831935238093138,
  "numReviews": 57,
  "countInStock": 29
}
```

#### 3. Search Product

**Endpoint:** `GET /products/dataset/:dataset/search`

This endpoint searches for small products based on a query string.

- **Query Parameters:**
  - `q` (required): The search query.

**Example Request:**

```http
GET /products/dataset/large/search?q=Product
```
