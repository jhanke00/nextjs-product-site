# Infrastructure

Documentation on any Infrastructure setup or changes made.

## Data Storage for Viewed Products

### Database Setup (Optional)

- **SQLite Database:**
  - For the POC, a lightweight SQLite database can be used to store the `viewedProducts` array.
  - Create a `viewed_products` table with columns for `user_id` and `product_id`.
  - Implement functions in `src/lib/database.ts` to:
    - Insert new viewed products.
    - Retrieve viewed products for a specific user.

### Local Storage (Alternative)

- If a database is not used, the `viewedProducts` array can be stored in the browser's local storage.
- This is a simpler approach for the POC but has limitations in terms of persistence and data sharing across devices.

## Future Considerations

- **Scalable Database:**
  - For production environments, consider a more scalable database solution like PostgreSQL or MongoDB.
- **Caching:**
  - Implement caching mechanisms (e.g., Redis) to improve performance and reduce the load on the database.
