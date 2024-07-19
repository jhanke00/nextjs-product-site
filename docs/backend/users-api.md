# Users API

## Endpoints

### Get user by ID

`http://localhost:4000/api/users/[user.id]`

#### Params:

1. User ID

### Responses:

1. Status code: 200

```json
{
  "status": 200,
  "response": {
    "id": "5b7e26c1-f4e4-4dfe-a038-b7339c022f2d",
    "firstName": "Jakayla",
    "lastName": "Wisozk",
    "phoneNumber": "832-826-3225 x3455",
    "email": "Jakayla.Wisozk38@hotmail.com"
  }
}
```

2. Status code: 405

```json
{
  "status": 405,
  "response": "Method not allowed"
}
```

3. Status code: 404

```json
{
  "status": 404,
  "response": "User not found"
}
```

### Get orders by user ID

`http://localhost:4000/api/users/[user.id]/orders`

#### Params:

1. User ID

#### Query params (optional):

`http://localhost:4000/api/users/[user.id]/orders?from=[yyyy-mm-dd]&to=[yyyy-mm-dd]`

1. From
2. To

### Responses:

1. Status code: 405

```json
{
  "status": 405,
  "response": "Method not allowed"
}
```

2. Status code: 404

```json
{
  "status": 404,
  "response": "User not found"
}
```

3. Status code: 204

```json
{
  "status": 204,
  "response": "No orders found"
}
```

4. Status code: 200

```json
{
    "status": 200,
    "response": [
        {
            "user": "5b7e26c1-f4e4-4dfe-a038-b7339c022f2d",
            "items": [
                {
                    "id": "f1f8d8b5-1e16-415f-a529-219fa16693c5",
                    "name": "Bespoke Fresh Towels",
                    "price": "690.00",
                    "count": 1
                },
                {
                    "id": "4cad9980-ccca-4355-b367-62d0df6ff1c1",
                    "name": "Fantastic Rubber Mouse",
                    "price": "995.00",
                    "count": 1
                },
            ],
            "total": 4556,
            "time": "2024-11-14T06:15:53.148Z"
        },
        {
            "user": "5b7e26c1-f4e4-4dfe-a038-b7339c022f2d",
            "items": [
                {
                    "id": "ea3fdb8b-4d7a-4693-ace2-6021b51650df",
                    "name": "Rustic Plastic Hat",
                    "price": "607.00",
                    "count": 2
                }
            ],
            "total": 1214,
            "time": "2024-08-25T05:22:04.706Z"
        },
}
```

### Get orders spent by user ID

`http://localhost:4000/api/users/[user.id]/orders/spent`

#### Params:

1. User ID

#### Query params (optional):

`http://localhost:4000/api/users/[user.id]/orders/spent?from=[yyyy-mm-dd]&to=[yyyy-mm-dd]`

1. From
2. To

### Responses:

1. Status code: 405

```json
{
  "status": 405,
  "response": "Method not allowed"
}
```

2. Status code: 404

```json
{
  "status": 404,
  "response": "User not found"
}
```

3. Status code: 204

```json
{
  "status": 204,
  "response": "No orders found"
}
```

4. Status code: 200

```json
{
  "status": 200,
  "response": 45234
}
```

### 'To Do' Pendings for the API:

1. Add JWT token to securize our API along with authentication methods.
2. For long order lists, add some kind of pagination.
3. Use a in-memory database as Redis for better performance.

## Testing

### Running tests:

For running tests you only have to open a new command line interface & run `make test`. Be sure to be in `/infra/users` folder. Otherwise you can run `docker exec npm run test`.
Also you can run tests by running `npm run test` but you should be located in `/app/api` folder.

### Test folder location:

You can find test files [here](../../app/api/src/test/)

### Clarifications for tests:

At the moment I only created tests for the handlers. Other parts of the project will need to be tested as `server.ts`, `router.ts` and `/app/api/users/index.ts` files.
I tried to keep things simple but ideally that I wanted to do.
