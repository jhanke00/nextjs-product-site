# User API

## Endpoints

- `GET /api/user/[userId]`: Returns user information.
- `GET /api/user/[userId]/orders`: Returns all orders for a user.
- `GET /api/user/[userId]/totalSpent`: Returns the total amount spent by a user on orders.

## Usage

1. Send a GET request to `/api/user/[userId]` to get user information.
2. Send a GET request to `/api/user/[userId]/orders` to get all orders for a user.
3. Send a GET request to `/api/user/[userId]/totalSpent` to get the total amount spent by a user on orders.

## Testing

1. Run `pnpm test` to run all tests.
