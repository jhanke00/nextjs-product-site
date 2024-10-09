# Backend Documentation

Implementation of authentication routes in the backend for user registration, login, and CRUD functionality. The backend was designed to be lightweight, using Redis for session management and SQLite as the database. The goal is to demonstrate solid backend practices, with a focus on authentication and API architecture.

## Stack Overview

- **Database**: SQLite
- **Session Management**: Redis using Docker
- **Package Manager**: PNPM
- **Testing**: Jest

## Installation

### Prerequisites

Ensure that the following tools are installed on your machine:

- **Node.js** (v16.x or higher)
- **PNPM** (package manager)
- **Docker** (for Redis setup)

### 2. Install Dependencies

Using PNPM, install all required dependencies:

```bash
pnpm install
```

### 3. Start Redis

Redis is used for managing refresh tokens in the application. You can easily set up a Redis container using Docker:

```bash
docker run --name redis -p 6379:6379 -d redis
```

### 4. Run the Application

Once the Redis server is running and all dependencies are installed, start the development server:

```bash
pnpm run dev
```

## API Endpoints

### Authentication

- **POST /api/auth/register**: Registers a new user.

  - Payload:
    ```json
    {
      "username": "user",
      "password": "pass"
    }
    ```

- **POST /api/auth/login**: Logs a user in and returns access/refresh tokens.

  - Payload:

    ```json
    {
      "username": "user",
      "password": "pass"
    }
    ```

- **POST /api/auth/[id]**: Return user using iD
- Method GET
- Payload :

```json
{
  "id": "number"
}
```

- **POST /api/auth/[id]**: Modify user using iD
- Method Put
- Payload :

```json
{
  "name": "string",
  "email": "string",
  "role": "string"
}
```

- **POST /api/auth/[id]**: Delete user using iD
- Method DELETE
- Payload :

```json
{
  "id": "number"
}
```

## Database

This project uses SQLite as its database engine. A SQLite database file is created when the app is run locally. To interact with the database, we use Prisma ORM for managing models and migrations.

### 1. Run Migrations

To set up the initial database schema, run:

```bash
pnpm prisma init
```

```bash
pnpm prisma migrate dev --name init
```

### 2. Prisma Studio

To view and edit data directly in the SQLite database, use Prisma Studio:

```bash
pnpm prisma studio
```

## Testing

To run all tests and ensure the application functions as expected, use:

```bash
pnpm run test
```

Make sure the Redis container is running before executing the tests, as it's required for session management.

## API Documentation

You can view the complete API documentation with Swagger. To access it, ensure the server is running and visit: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)

## Environment Variables

Make sure to set up the following environment variables in your `.env.local` file:

```env

JWT_SECRET="your-secret-key"
```

- **JWT_SECRET**: A secret key used for signing JWT tokens.

## Conclusion

This backend provides essential features for user authentication, leveraging Redis for session handling and SQLite for data persistence. The architecture is simple yet flexible, with room for further expansion in a production environment.
