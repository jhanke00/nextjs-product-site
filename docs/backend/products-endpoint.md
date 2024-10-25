# Products Endpoint

This project uses RSCs to render the UI and also exposes an API for external clients, so at the moment we have a products repository that is used to list all products and fetch a single product by id. The repository is used both in the page components as well as in the `/products` API routes, that way the logic to fetch products is isolated and can be reused.

## Local setup

1. First you need the database set up as described in the [database](../infrastructure/database.md) docs.
2. With the app running locally, you can populate the DB by navigating to `http://localhost:3000/api/dev-support/populate-database`
3. Navigate to `http://localhost:3000/products?page=1` to see the products page.
4. Navigate to `http://localhost:3000/products/$ID` to see the product detail page.
5. Fetch `http://localhost:3000/api/products?page=1` to get the products list via API.
6. Fetch `http://localhost:3000/api/products/1` to get a single product via API.
