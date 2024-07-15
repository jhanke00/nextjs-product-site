# Backend

Documentation on any Backend capabilities or changes made.

# server/index.ts file

The code sets up a basic Node.js Express server using TypeScript.
It imports necessary modules, including Express, user routes, and authentication routes.
An Express application is created and middleware is configured to parse JSON requests.
User-related and authentication routes are mounted onto the Express app.
The server starts listening on the specified port, ready to handle incoming requests.

# utils/paginate.ts

It takes an array of items and pagination options (page number and items per page) as input.
The function calculates the starting and ending indices for the desired page.
Finally, it returns a sliced portion of the original array containing the items for the specified page.
Essentially, it breaks down a large dataset into smaller, manageable chunks for display.

# utils/validate.ts

This function validates user data (phone number, email, password, first name, and last name). It checks for required fields and performs basic validation on email and password formats. If any validation fails, it returns an error message. Otherwise, it returns null, indicating valid data.

# mock/small/customUsers.json

This file contains information about newly registered users.

# app/api/auth.ts

This file handles user signup and login functionalities.

Key functionalities:

User registration
User login with JWT authentication
User data storage and retrieval (using a JSON file for simplicity)
Password hashing using bcrypt
Basic error handling

# ap/api/user.ts & ap/api/userLargeSet.ts

This TypeScript file contains functions to retrieve user information from both large and small datasets.
It likely includes logic for handling different data sources (e.g., databases, files)
and optimizing performance for large datasets.

It includes:

Endpoint that returns user information by using the id
Endpoint that returns all user's orders if there are any
Endpoint that returns how much the user has spent on orders
