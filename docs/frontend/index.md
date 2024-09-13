# Frontend

Documentation on any Frontend capabilities or changes made.

## Products Listing Page

- Displaying All Products from Mock Data:
  We have implemented a feature that enables the display of all products available in our mock data. Users can now easily browse through the entire product catalog, providing them with a comprehensive view of our offerings.

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

## Products Detail Single Page

- Single Page Description for Products:
  We have introduced a feature that offers detailed product descriptions on a single page. Users can now access comprehensive information about each product, including specifications, pricing, and additional details, all in one centralized location. This enhancement aims to provide users with a better understanding of our products, facilitating informed decision-making during their shopping experience.

## Orders Page

- **Displaying Orders for a User**:
  The Orders page now shows all orders associated with a specific user. It includes a list of products ordered, the quantity of each product, and the total amount spent. This feature allows users to view their order history comprehensively.

- **Enhanced Order Item Design**:
  Each order item is displayed with improved styling, including a modern card layout, enhanced hover effects, and responsive design adjustments. This design upgrade ensures that users have a visually appealing and user-friendly experience when reviewing their orders.

- **Smooth Navigation Links**:
  Styled links with smooth hover animations have been added to improve user interaction. These include links for navigating between the order list and the user information page, providing a more seamless and professional navigation experience.

## User Information Page

- **User Information Display**:
  The User Information page presents detailed information about a single user, including their name, email, and phone number. The design is clean and modern, featuring subtle animations to enhance the visual appeal.

- **Responsive Design and Centered Content**:
  The user information page is designed to be fully responsive, with content centered using flexbox for improved alignment and readability across different screen sizes.

## Folder Structure

- `pages/orders/[userId]/index.tsx` - Page for displaying all orders of a specific user.
- `pages/orders/[userId]/styles.module.css` - CSS module for styling the orders page.
- `pages/users/[id]/index.tsx` - Page for displaying detailed user information.
- `pages/users/[id]/styles.module.css` - CSS module for styling the user information page.
- `src/components/orders/OrderItem.tsx` - Component for rendering individual order items with enhanced styling.
- `src/components/orders/OrderItem.module.css` - CSS module for styling individual order items component.
- `src/components/orders/OrderList.tsx` - Component for rendering the list of orders.
- `src/components/orders/OrderList.module.css` - CSS module for styling the list of orders component.
- `src/components/users/UserInfo.tsx` - Component for displaying user information with modern design.
- `src/components/users/UserInfo.module.css` - CSS module for styling user component with modern design.
- `app/products/layout.tsx` - Product page layout
- `app/products/page.tsx` - Product Main Page
- `app/products/[productId]/page.tsx` - Page for the single page description
- `src/mock/small/products-new.json` - Mock JSON for Product list
- `src/mock/large/products-new.json` - Mock JSON for Product list
