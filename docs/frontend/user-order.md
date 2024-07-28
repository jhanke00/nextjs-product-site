## Backend

### User's Orders Page

**Description:**

This document provides an overview of the user, order, and total spend API functionalities within this project. It also outlines potential changes to consider for future implementations.

**Getting Started:**

1. Ensure you have Node.js and npm (or yarn) installed.
2. Clone this repository.
3. Install dependencies: `pnpm install`
4. Run the development server: `pnpm dev`
5. Open http://localhost:3000 with your browser to see the result.

#### Orders Endpoint

- **URL:** `/orders/[userId]`
- **Method:** GET
- **Description:** Retrieves order details for a specific user.
- **Example:** `http://localhost:3000/orders/1`

#### Order Endpoint

- **URL:** `/order/[userId]`
- **Method:** GET
- **Description:** Retrieves order details for a specific user. (Note: Consider if this endpoint is necessary or if it duplicates the `orders` endpoint)
- **Example:** `http://localhost:3000/order/1`

### Folder Structure

#### Orders Module

- `app/orders/[userId]/page.tsx` - This page returns user information for the specified user's orders using fetch method .
- `src/orders/summary.tsx` - Calculates and returns product cost, quantity, and total for each product.
- `src/orders/totalsummary.tsx` - Calculates and returns total products, shipping charges, taxes, and subtotal spent on orders.

#### Order Module (Optional)

- `app/order/[userId]/page.tsx` - This page returns user information for the specified user's orders using json data .
- `src/orders/summary.tsx` - Calculates and returns product cost, quantity, and total for each product.
- `src/orders/totalsummary.tsx` - Calculates and returns total products, shipping charges, taxes, and subtotal spent on orders.

#### Data

- `public/data/users.json`: Contains user data.
- `public/data/orders.json`: Contains order data.

**Additional Notes:**

- This is a basic example, and further customization might be required depending on your specific needs.
