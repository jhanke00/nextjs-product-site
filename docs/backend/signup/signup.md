# Endpoint: `/api/signup`

## Description

This endpoint allows users to create a new account by providing the required information, such as `firstname`, `lastname`, `email`, and `password`. The password is hashed using bcrypt before being stored, and the user is registered in the system. A JWT token is returned upon successful registration for subsequent authentication.

## Method

- **POST**

## Parameters

- `firstname` (required): The user's first name.
- `lastname` (required): The user's last name.
- `email` (required): The user's email address.
- `password` (required): The user's password (will be hashed before storage).

## Response

- **Success**: Returns a success message and a JWT token for authentication.

  ```json
  {
    "token": "jwt-token",
    ...
  }

  ```

- **Error**: If required fields are missing, invalid, or if there is an issue with user creation.

## How It Works

This endpoint processes the user registration by accepting `firstname`, `lastname`, `email`, and `password` in the request body. The password is hashed using bcrypt for security before being stored in the database or mock data source. A JWT token is generated and returned as part of the successful response for authentication in subsequent requests.
