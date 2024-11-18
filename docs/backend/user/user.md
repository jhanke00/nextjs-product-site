# Endpoint: `/api/user/[id]`

## Description

This endpoint retrieves a user by their `id`. The `id` is passed as a URL parameter in the path.

## Method

- **GET**

## Parameters

- `id` (required): The unique identifier of the user.

## Response

- **Success**: Returns a JSON object with the `id`.

  ```json
  {
    "id": "user-id",
    "firstName": "Jane",
    "lastName": "Doe",
    "phoneNumber": "999-9999-9999",
    "email": "janemcguiredoe@hotmail.com"
  }
  ```

- **Error**: If the id is not provided in the request path, the following error message is returned:

  ```json
  {
    "error": "ID not provided"
  }
  ```

## How It Works

This endpoint simply returns the id of the user passed in the URL. It's useful for fetching basic user information based on the id.

# Endpoint: `/api/user/[id]/orders`

## Description

This endpoint retrieves all orders associated with a specific user. The `id` of the user is passed as a URL parameter in the path.

## Method

- **GET**

## Parameters

- `id` (required): The unique identifier of the user whose orders are to be retrieved.

## Response

- **Success**: Returns a JSON array of orders associated with the user.

  ```json
  [
    {
      "user": "user-id",
      "items": [
        {
          "id": "product-id",
          "name": "product-name",
          "price": "18.00",
          "count": 3
        }
      ],
      "total": 999,
      "time": "1999-09-16T19:01:13.700Z"
    }
  ]
  ```

## Error Responses

- **Error**: If no orders are found for the specified user, the following error message is returned:
  ```json
  {
    "message": "Orders not found"
  }
  ```

## How It Works

This endpoint filters all orders by the user's `id` and returns the list of orders made by that user. It helps in fetching the order history of a specific user.

# Endpoint: `/api/user/[id]/orders/total`

## Description

This endpoint calculates the total value of all orders associated with a specific user. The `id` of the user is passed as a URL parameter in the path.

## Method

- **GET**

## Parameters

- `id` (required): The unique identifier of the user whose total order value is to be calculated.

## Response

- **Success**: Returns the total value of all orders associated with the user.

  ```json
  {
    "total": 350
  }
  ```

## How It Works

This endpoint calculates the sum of all `total` values from the orders made by the user specified by the `id`. It's useful for providing a financial summary of a user's orders.
