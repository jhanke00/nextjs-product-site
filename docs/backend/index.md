# Backend

- Manages user information and orders.
- Authentication and user registration.
- Uses mongodb for data storage.
- Middleware for catching and handling errors in a standardized way.
- Consistent structure for API responses including status codes and messages.
- Unit tests for services.
- Configurable environment variables.

## Routes

- `GET /api/user/[userId]`: Returns user information.
- `GET /api/user/[userId]/orders`: Returns all orders for a user.
- `GET /api/user/[userId]/totalSpent`: Returns the total amount spent by a user on orders.
- `POST /api/auth/login`: Logs in a user.
- `POST /api/auth/register`: Registers a new user.
