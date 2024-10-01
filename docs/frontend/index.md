# Frontend

Documentation on any Frontend capabilities or changes made.

## Prodcuts Listing Page

- Displaying All Products from Mock Data:
  We have implemented a feature that enables the display of all products available in our mock data. Users can now easily browse through the entire product catalog, providing them with a comprehensive view of our offerings.

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

## Prodcuts Detail Single Page

- Single Page Description for Products:
  We have introduced a feature that offers detailed product descriptions on a single page. Users can now access comprehensive information about each product, including specifications, pricing, and additional details, all in one centralized location. This enhancement aims to provide users with a better understanding of our products, facilitating informed decision-making during their shopping experience.

## Authentication

- Pages for user login and registration are available.
- Example of protected route that requires authentication.
- Middleware to check user authentication status before allowing access.
- Single instance of axios for API calls and handle authentication token at `src/utils/api.ts`.

## Folder Structure

- `app/products/layout.tsx` - Product page layout
- `app/products/page.tsx` - Product Main Page
- `app/products/[productId]/page.tsx` - Page for the single page description
- `app/auth/signin/page.tsx` - Signin Page
- `app/auth/signup/page.tsx` - Signup Page
- `app/protected/page.tsx` - Example of protected route
- `app/components/ProtectedRoute.tsx` - Middleware to check user authentication status
- `src/mock/small/products-new.json` - Mock JSON for Prodcut list
- `src/mock/large/products-new.json` - Mock JSON for Prodcut list
