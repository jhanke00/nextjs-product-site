# Backend

- Add postgres sql as the backend database
  - includes a docker-compose.yml file for creating the database and running pg admin locally
- Added knex.js for
  - generating and running sql queries
  - adding migrations for schema changes
  - seeding database tables with values
- Implemented api routes for:
  - all products - `/api/products`
    - results are paginated using query params `page` and `size`
    - allows searching using query param `search`
  - single product - `/api/products/[productId]`
  - all users - `/api/users`
    - results are paginated using query params `page` and `size`
    - allows searching using query param `search`
  - all orders for a user - `/api/orders?userId=[userId]`
  - total of all orders for a user - `/api/orders/total?userId=[userId]`
