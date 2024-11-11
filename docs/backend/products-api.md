# Product API Documentation

## Overview

This document outlines the implementation of the products API endpoints for the small and large datasets utilizing mock data.

## Endpoints

### 1. List Products

**GET /api/products**:
Retrieve a list of products with optional pagination and search functionality.

**Query Parameters:**

- limit (number, optional): Maximum number of products to return.
- offset (number, optional): Number of products to skip before starting to collect the results.
- search (number, optional): Query string to search for products name.

Examples:
**GET /api/products** to retrieve all products (be aware of the size of the dataset we're working with).
**GET /api/products?limit=10&offset=20** to retrieve products with pagination (ignoring the first 20 and fetching the next 10).
**GET /api/products?search=Awesome** to search for products starting with "Awesome".
**GET /api/products?search=Awesome&limit=5&offset=10** to combine pagination with name searching.

Response always returns a JSON array of product objects matching the criteria in this format:

>

    {
        "id":"82f5c990-fc36-4931-8678-8af71434ca47",
        "name":"Recycled Steel Chips",
        "price":"972.00",
        "description":"The automobile layout consists of a front-engine design...",
        "category":"Movies",
        "rating":1.9314758584368974,
        "numReviews":53,
        "countInStock":52
    }

---

### 2. Get Product by ID

**GET /api/products/{id}**:
Retrieves detailed information about a single product by its unique ID.

**Path Parameters:**

- {id} (string): The unique identifier of the product.

Examples:
**GET /api/products/82f5c990-fc36-4931-8678-8af71434ca47** to retrieve the product with the informed Id.

Response returns a JSON object of the product in this format:

>

    {
        "id":"82f5c990-fc36-4931-8678-8af71434ca47",
        "name":"Recycled Steel Chips",
        "price":"972.00",
        "description":"The automobile layout consists of a front-engine design...",
        "category":"Movies",
        "rating":1.9314758584368974,
        "numReviews":53,
        "countInStock":52
    }

---

### Testing

Ensure the application is running locally by executing `pnpm dev`.
Use a browser. cURL or Postman for simple `GET` requests.

**Cases:**
List all products: `GET http://localhost:3000/api/products`
List Products with Pagination: `GET http://localhost:3000/api/products?limit=10&offset=0`
Search Products by Name: `GET http://localhost:3000/api/products?search=Awesome`
Combined Pagination and Search: `GET http://localhost:3000/api/products?search=Pro&limit=5&offset=0`
Get Product by ID: `GET GET http://localhost:3000/api/products/82f5c990-fc36-4931-8678-8af71434ca47`
