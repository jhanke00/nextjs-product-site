# Product API Endpoints for Small Dataset

# Backend

# pages/api/product.js file

The product.js file sets up a Node.js Express server. It imports necessary modules, including Express and routes for product APIs. Middleware is configured to parse JSON requests. Product-related routes are mounted onto the Express app, handling requests for product lists, single product queries, and product searches.

# src/utils/product.js file

This module contains functions to handle product data:

productList(type, page, limit): Retrieves a paginated list of products ('small' or 'large' dataset).
singleProductSmall(id): Retrieves a single product by ID from the small dataset.
searchProduct(query): Retrieves products from the small dataset that match the search query.

# Endpoint Details

/api/product/small/productList
Retrieves a paginated list of products from the small dataset.
Parameters: page (optional, default: 1), limit (optional, default: 10)
Response: Returns a JSON array of products.

/api/product/small/id/
Retrieves a single product from the small dataset by ID.
Parameters: id (product ID)
Response: Returns JSON object of the product or 404 error if not found.

/api/product/small/query
Retrieves a list of products from the small dataset that start with the provided search query.
Parameters: q (search query)
Response: Returns JSON array of products matching the query or 400 error if q parameter is missing.

# Product API Endpoints for Large Dataset

Similar setup as for small dataset endpoints, with optimizations for handling large datasets.

# pages/api/product.js file

productList(type, page, limit): Retrieves a paginated list of products.
singleProductLarge(id): Retrieves a single product by ID from the large dataset.

# Endpoint Details

/api/product/large/productList
Retrieves a paginated list of products from the large dataset.
Parameters: page (optional, default: 1), limit (optional, default: 10)
Response: Returns a JSON array of products.

/api/product/large/id/
Retrieves a single product from the large dataset by ID.
Parameters: id (product ID)
Response: Returns JSON object of the product or 404 error if not found.

Running the Server
To start the server and access these endpoints: http://localhost:8000
