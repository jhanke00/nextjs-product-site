# Users API Documentation

## Overview

This document outlines the implementation of the users API endpoints for the small and large datasets utilizing mock data.

## Endpoints

### 1. Signup

**POST /api/signup**:
Create an user if the conditions are valid.

**Body Parameters:**

- email (string): User's e-mail.
- password (string): User's password.
- firstName (string): User's first name.
- lastName (string): User's last name.
- phoneNumber (string): User's phone number.

Response returns a 201 CREATED status.

---

### 2. Login

**POST /api/auth**:
Retrieve a Json Web Token if the credentials are valid.
Credentials are always valid if a mocked user e-mail is used.

**Body Parameters:**

- email (string): User's e-mail.
- password (string): User's password. For the sake of testing, use "SampleP4ss" for every user that is original to the mock data set.

Response returns a JSON with the token in this format:

>

    {
        "token":"eyJhbGciOiJIUzI1N...."
    }

---

### 3. Get Authenticated User Information

**GET /api/users**:
Retrieves detailed information about the authenticated user.

**Header Parameters:**

- {Authorization} (string): The JWT retrieved by the authentication endpoint.

Response returns a JSON object of the product in this format:

>

    {
        "id": "fd7398ab-7968-4a1c-adfb-142d30b6a936",
        "firstName": "Caroline",
        "lastName": "Swift",
        "phoneNumber": "1-446-490-1781 x3745",
        "email": "Caroline_Swift50@hotmail.com"
    }

---

### 4. Get Authenticated User Orders

**GET /api/users/orders**:
Retrieves the orders of the authenticated user.

**Header Parameters:**

- {Authorization} (string): The JWT retrieved by the authentication endpoint.

**Query Parameters:**

- limit (number, optional): Maximum number of products to return.
- offset (number, optional): Number of products to skip before starting to collect the results.

Examples:
**GET /api/users/orders** to retrieve all products (be aware of the size of the dataset we're working with).
**GET /api/users/orders?limit=10&offset=20** to retrieve products with pagination (ignoring the first 20 and fetching the next 10).

Response always returns a JSON array of order objects matching the criteria in this format:

>

    [
        {
            "user": "fd7398ab-7968-4a1c-adfb-142d30b6a936",
            "items": [
                {
                    "id": "3a6d6722-4274-47d3-8b7f-f0a3ddbe4d14",
                    "name": "Modern Soft Sausages",
                    "price": "119.00",
                    "count": 3
                }
            ],
            "total": 357,
            "time": "2023-03-16T19:01:13.700Z"
        }
    ]

---

### 5. Get Authenticated User Total Spent Amount

**GET /api/users/orders/total-spent**:
Retrieves the total spent amount of the authenticated user in all orders.

**Header Parameters:**

- {Authorization} (string): The JWT retrieved by the authentication endpoint.

Response returns a JSON object in this format:

>

    {
        "totalSpent": 19604
    }

---

### Testing

Ensure the application is running locally by executing `pnpm dev`.
Use a browser. cURL or Postman for simple `GET` and `POST` requests.

**Cases:**
Authenticate: `POST http://localhost:3000/api/auth` passing email and password in the request body.
Get user information: `GET http://localhost:3000/api/users` passing the authentication in the request headers.
Get user orders: `GET http://localhost:3000/api/users/orders` passing the authentication in the request headers.
Get user orders with pagination: `GET http://localhost:3000/api/users/orders?limit=5&offset=0` passing the authentication in the request headers.
Get total spent: `GET http://localhost:3000/api/users/orders/total-spent` passing the authentication in the request headers.
