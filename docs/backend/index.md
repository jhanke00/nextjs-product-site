# Backend

- Manages user information and orders.
- Methods for user login and registration.
- Middleware for protecting routes. (TODO)
- Middleware for catching and handling errors in a standardized way at `src/utils/apiErrors/*`.
- Consistent structure for API responses including status codes and messages at `src/types/http.ts`
- Unit tests for services.
- Configurable environment variables at `src/config/*.ts`.

## Routes

- `GET /api/user/[userId]`: Returns user information.
- `GET /api/user/[userId]/orders`: Returns all orders for a user.
- `GET /api/user/[userId]/totalSpent`: Returns the total amount spent by a user on orders.
- `POST /api/auth/login`: Logs in a user.
- `POST /api/auth/register`: Registers a new user.
