# Frontend

Documentation on any Frontend capabilities or changes made.

# Prodcuts Listing Page: http://localhost:3000/productslist

- Header:
  We have added header to display logo.

- Left Navigation:
  Left navigation menu implemented to navigate different pages like Home, Products, Orders.

- Displaying All Products from Mock Data:
  We have implemented a feature that enables the display of all products available in our mock data. Users can now easily browse through the entire product catalog, providing them with a comprehensive view of our offerings. Product list contains Name, Price, Category, Count in Stock, Rating fields.
  On clicking on Name, it will be navigate to Product details page.

- Breadcrumb:
  Breadcrumb (resuable component) implemented for users to navigate to previous page.

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

- Search for filtering Products:
  We have implemented search feature (By Name, Category) to filter the Products.

# Prodcuts Detail Single Page: http://localhost:3000/productslist/{id}

- Single Page Description for Products:
  We have introduced a feature that offers detailed product descriptions on a single page. Users can now access comprehensive information about each product, including specifications, pricing, and additional details, all in one centralized location. This enhancement aims to provide users with a better understanding of our products, facilitating informed decision-making during their shopping experience.

## Folder Structure

- `app/productslist/layout.tsx` - Product page layout
- `app/productslist/page.tsx` - Product Main Page
- `app/productslist/[productId]/page.tsx` - Page for the single page description
- `src/mock/small/products-new.json` - Mock JSON for Prodcut list
- `src/mock/large/products-new.json` - Mock JSON for Prodcut list
- `src/components/BreadCrumb.tsx` - Breadcrumb reusable component
- `src/components/Header.tsx` - Header to show logo
- `src/components/LeftNavigation.tsx` - Left navigation
- `src/components/MainLayout.tsx` - To display the main content
- `src/components/Pagination.tsx` - Pagination reusable component
- `src/components/ProductListSkeleton.tsx` - Skeleton for product list (Can be used once API done)
- `src/components/ProductsList.tsx` - To display list of products
- `src/components/Search.tsx` - Product search component
- `src/components/Skeleton.tsx` - Skeleton for product list rows (Can be used once API done)
