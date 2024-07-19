# Products Listing Page

- Displaying All Products from Mock Data:
  We have implemented a feature that enables the display of all products available in our mock data. Users can now easily browse through the entire product catalog, providing them with a comprehensive view of our offerings.

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

- Search product by name:
  To enhance user experience, we have introduced a text input that allow users to search for specific products by name

- Shareable URL:
  Now the pagination and search params are stored in the URL, which allows the user to share the URL with others without losing filters that were made

- First page and last page buttons:
  We have introduced two more buttons for pagination, which allow users to visit the first page and last page in a faster and easier way

# Products Detail Single Page

- Single Page Description for Products:
  We have introduced a feature that offers detailed product descriptions on a single page. Users can now access comprehensive information about each product, including specifications, pricing, and additional details, all in one centralized location. This enhancement aims to provide users with a better understanding of our products, facilitating informed decision-making during their shopping experience.

- Similar products section:
  We have introduced a section below the Product details to allow users to find a small list of products within the same category

# Product Card Component

- A reusable component:
  We have introduced a Product Card component that is used to display relevant product information and that is reusable across several pages

## Folder Structure

- `app/products/layout.tsx` - Product page layout
- `app/products/page.tsx` - Product Main Page
- `app/products/[productId]/page.tsx` - Page for the single page description
- `app/products/product-card.tsx` - Page Component for displaying relevant product information
- `src/mock/small/products-new.json` - Mock JSON for Product list
- `src/mock/large/products-new.json` - Mock JSON for Product list
