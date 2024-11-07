# User Orders Page

## Feature

We implemented the User Orders page, where we display the orders associated with a given user along with a summary with the order count and the total expenditure by that user.

This new page can be found at `/users/:userId` and it accepts two query params:

- `page` -> Orders page number
- `perPage` -> Number of orders to display per page

Currently there's no authentication in place, therefore it's possible to access any user's page.

## Mocking

As there's no backend in place, we have to resort to mocking for the user data, however, to make it as close as possible to "the real thing" and as easy as possible to replace it by the actual implementation (whenever this comes to be), instead of importing mock data directly, we put it behind NextJs's API routes.

When the actual API gets implemented, the only thing we have to change is the `NEXT_PUBLIC_API_BASE_URL` env var.

## Testing

We've implemented a few E2E tests which can be run by starting the NextJS server (with a production build) and then running playwright against it.

Start the application with a prod build:

```sh
pnpm run build && pnpm run start
```

Then, in another terminal:

```sh
pnpm run e2e
```
