# Backend

### User API Endpoint for Small Dataset

**Description:**

This document provides an overview of the user, order, and total spend API functionalities within this project. It also outlines potential changes to consider for future implementations.

**Getting Started:**

1. Ensure you have Node.js and npm (or yarn) installed.
2. Clone this repository.
3. Install dependencies: `pnpm install`
4. Set the `MONGODB_URI` environment variable if migrating to MongoDB.
5. Run the development server: `pnpm dev`
6. Open http://localhost:3000 with your browser to see the result.
7. Use tools like Postman to test the API endpoints.

**API Endpoints:**

- **Local URL:**

  - http://localhost:3000/users

- **users (POST):**

  - **Functionality:** Retrieves all users for a specific user.
  - **Request:**
    - Body: `{ userId: number }`
  - **Response:**
    - Success: `{  id: number, name: string, email: string }` (includes specific user )
    - Error: `{ message: string, status: number }`

- **Local URL:**

  - http://localhost:3000/orders

- **orders (POST):**
  - **Functionality:** Retrieves all orders for a specific user.
  - **Request:**
    - Body: `{ userId: number,action: "order" }`
  - **Response:**
    - Success: `{ orders: Order[], totalSpent: number }` (includes user orders and total spend)
    - Error: `{ message: string, status: number }`
- **orders (POST):**
  - **Functionality:** Calculates the total spend across all orders (specific user).
  - **Request:**
    - Body: `{ userId: number,action: "userspend" }`
  - **Response:**
    - Success: `{ totalSpent: number }`
    - Error: `{ message: string, status: number }`
    - **orders (POST):**
  - **Functionality:** Calculates the total spend across all orders (without specifying a user).
  - **Request:**
    - Body: `{ action: "totalspend" }`
  - **Response:**
    - Success: `{ totalSpent: number }`
    - Error: `{ message: string, status: number }`

**Database:**

- This example currently uses JSON files for data storage.
- **Potential Change:** Consider migrating to a database like MongoDB for scalability and performance.

**Implementation Details:**

- The API routes are implemented in Next.js using TypeScript.
- Mongoose (or a similar ODM) would be required for MongoDB integration.

**Possible Enhancements:**

- Authentication and Authorization
- Pagination
- Refined error handling
- Security measures
- Unit and integration testing

## Folder Structure

- `pages/api/users.ts` - endpoint that returns my user information
- `pages/api/orders.ts` - endpoint that returns all of my user's orders and switch cases endpoint that returns how much the user has spent on orders and overall spent on orders
- `pages/models/users.ts` - Page for the user page interface
- `pages/models/order.ts` - Page for the order page interface
- `pages/models/Error.ts` - Page for the Error page interface
- `pages/data/users.json` - JSON for User list
- `pages/data/orders.json` - JSON for Order list
- `utils/connectDb.js` - If required for Mongodb connection

**Additional Notes:**

- This is a basic example, and further customization might be required depending on your specific needs.
