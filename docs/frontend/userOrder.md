# Frontend

Documentation on any Frontend capabilities or changes made.

# User's Listing Page

- Displaying all users based on the mock data:
  When user navigates to ${BASE_URL}/users, they can view all the users with details like Full Name and email id in the page. They are displayed in a grid format.
  When you click on a user card, the page gets navigated to the Orders History Page for that specific user

- Pagination for Improved Navigation:
  To enhance user experience and prevent issues associated with infinite scrolling, we have introduced pagination functionality. Users can now navigate through the product list more efficiently by moving between different pages, allowing for smoother and more organized browsing.

# User's Order Page

- Displaying all the orders by the selected user:
  All the Orders with details like products ordered with quantity, Total Price and the Order Date are displayed in this page.
  Also, the total expense which is the sum of all the orders total is displayed at the top of the page.
  Along with it, we have provided a link to navigate back to the user's listing page

## Folder Structure

- `app/pages/users.tsx` - Users Main Page
- `pages/orders/[userId]/index.tsx` - User's Order Page

## Some Reusable Component

- `src/components/common/button.tsx` - This is reusable Button component
- `src/components/common/orderList.tsx` - This is reusable Order List component
- `src/components/common/pagination.tsx` - This is reusable Pagination component

## Utils

- `src/utils/dateFormatter.ts` - Utility Function to convert the date in raw data.

## Mock JSON Data for users and orders

- `src/mock/large/users.json` - Mock JSON for User List
- `src/mock/large/orders.json` - Mock JSON for Orders List
- `src/mock/small/users.json` - Mock JSON for Users List
- `src/mock/small/orders.json` - Mock JSON for Orders List
