# Backend

After following all the steps in the infrastructure documentation, which contains the [docker instructions](./../infrastructure/docker/docker-instructions.md) and the [prisma instructions](./../infrastructure/prisma/prisma-instructions.md), you're ready to proceed with the API requests.

# Routes

## Users `/api/users`

In this route you can make request to `fetch` all users and `create` a new user.

To **FETCH** you need to do use the `GET` method in `/api/users`, and you will receive the data in the format below:

```json
[
	{
		"id": "fd7398ab-7968-4a1c-adfb-142d30b6a936",
		"firstName": "Caroline",
		"lastName": "Swift",
		"phoneNumber": "1-446-490-1781 x3745",
		"email": "Caroline_Swift50@hotmail.com"
	},
	{
		"id": "24e1899b-101d-4580-acd8-70fc97c889a2",
		"firstName": "Meredith",
		"lastName": "O'Reilly",
		"phoneNumber": "(467) 651-1451 x721",
		"email": "Meredith_OReilly13@hotmail.com"
	},
	{
		"id": "a109278c-9f00-4d88-a5e6-0ac80925eacb",
		"firstName": "Raul",
		"lastName": "Dare",
		"phoneNumber": "(479) 445-7179 x803",
		"email": "Raul.Dare@hotmail.com"
	},
	{
		"id": "23c9802c-90c7-4035-9477-c75efa93e418",
		"firstName": "Ansel",
		"lastName": "Buckridge",
		"phoneNumber": "859.884.1524 x865",
		"email": "Ansel.Buckridge@gmail.com"
	},
	{
		"id": "2b6221e1-4141-4c83-98b2-8efbb0a7e355",
		"firstName": "Laury",
		"lastName": "Torphy",
		"phoneNumber": "566.325.2621 x843",
		"email": "Laury_Torphy@yahoo.com"
	}, ...
]
```

To **CREATE** a new user, use `POST` method on the same route, sending user data in the _body_, as in the instruction below:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "1-446-490-1781 x3745",
  "email": "john_doe@email.com"
}
```

I implemented a _utility function_ to separate the domain part of the email, and capitalize the first letter of the email, and the first letter after the dot `(.)` or underscore `(_)` separators, maintaining the mock file pattern.

For the request to be valid, there is a check if the email is already in use, if true, a `status code 400` is returned with the `User already exists` message, if not the user is created, returning a `status code 201` and the message `User created successfully`.

To **SEARCH** for a user's data by their **ID** can be accessed through a `GET` method on the route `/api/users/getUserById`, sending the user id as a search param, as in the example below:

```
/api/users/getUserById?id=fd7398ab-7968-4a1c-adfb-142d30b6a936
```

There is a check whether an id was provided for the database search to be carried out, and if the user is not found, it is returned a `status code 404` with the `User not found` message. User information is returned as below:

```json
{
  "id": "fd7398ab-7968-4a1c-adfb-142d30b6a936",
  "firstName": "Caroline",
  "lastName": "Swift",
  "phoneNumber": "1-446-490-1781 x3745",
  "email": "Caroline_Swift50@hotmail.com"
}
```

It is possible to **SEARCH** for a user by their **EMAIL** using the method `GET` on the route `/api/users/getUserByEmail`, sending the email as a search param. There is a check if the email was sent and we use the **utility function** again to process the input data, and then finally perform the search in the database. If the user is not found, it is returned a `status code 404` with the `User not found` message. If the search is successful, the user data is returned in the same format as the method above.

Lastly I implemented the **DELETE** method, using the method `DELETE` on the route `/api/users/delete`, sending the user id as a search param.

## Products `/api/products`

In this route you can make request to `fetch` all products and `create` a new product.

To **FETCH** you need to do use the `GET` method in `/api/products`, and you will receive the data in the format below:

```json
[
	{
		"id": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
		"name": "Recycled Fresh Chicken",
		"price": 758,
		"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
		"category": "Electronics",
		"rating": 4.467650192091241,
		"numReviews": 98,
		"countInStock": 93
	},
	{
		"id": "7f074836-6dbb-458c-bf24-b70289b44ef1",
		"name": "Oriental Wooden Ball",
		"price": 722,
		"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
		"category": "Clothing",
		"rating": 3.364421250298619,
		"numReviews": 54,
		"countInStock": 60
	},
	{
		"id": "fa6d6100-b2db-4d65-a022-06b98b9cb8de",
		"name": "Modern Cotton Cheese",
		"price": 35,
		"description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
		"category": "Jewelery",
		"rating": 2.045221213484183,
		"numReviews": 80,
		"countInStock": 65
	},
	{
		"id": "d7fe8e4c-6aae-4385-bd33-23720762d097",
		"name": "Ergonomic Soft Shirt",
		"price": 471,
		"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
		"category": "Automotive",
		"rating": 0.6600435834843665,
		"numReviews": 17,
		"countInStock": 68
	}, ...
]
```

To **CREATE** a new product, use `POST` method on the same route, sending product data in the _body_, as in the instruction below:

```json
{
  "name": "Recycled Fresh Chicken",
  "price": 22.0,
  "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
  "category": "Clothing",
  "rating": 3.3644212502986193,
  "numReviews": 54,
  "countInStock": 60
}
```

For the request to be valid, there is a check if the product already exist, searching if his name is already in use, if true, a `status code 400` is returned with the `Product already exists` message, if not the product is created, returning a `status code 201` and the message `Product created successfully`.

To **SEARCH** for a product's data by their **ID** can be accessed through a `GET` method on the route `/api/product/getUserById`, sending the product id as a search param, as in the example below:

```
/api/products/getProduct?id=aa99f914-866b-4eb2-8989-9bb142d86c9f
```

There is a check whether an id was provided for the database search to be carried out, and if the product is not found, it is returned a `status code 404` with the `Product not found` message. Product information is returned as below:

```json
{
  "id": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
  "name": "Recycled Fresh Chicken",
  "price": 758,
  "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
  "category": "Electronics",
  "rating": 4.467650192091241,
  "numReviews": 98,
  "countInStock": 93
}
```

Lastly I implemented the **DELETE** method, using the method `DELETE` on the route `/api/products/delete`, sending the product id as a search param.

## Orders `/api/orders`

In this route you can make request to `fetch` all orders and `create` a new order.

To **FETCH** you need to do use the `GET` method in `/api/orders`, and you will receive the data in the format below:

```json
[
	{
		"id": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
		"userId": "c12f95dd-9446-48bc-b124-9e0142d53820",
		"total": 4963,
		"time": "2024-04-25T17:26:49.504Z",
		"user": {
			"id": "c12f95dd-9446-48bc-b124-9e0142d53820",
			"firstName": "Owen",
			"lastName": "Towne",
			"phoneNumber": "561-250-5099 x94990",
			"email": "Owen_Towne@yahoo.com"
		},
		"items": [
			{
				"id": "547aeb29-63da-40ad-b13c-16315b80062f",
				"orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
				"productId": "76e3acca-b997-4839-bc46-6fa81f50ea3b",
				"price": 545,
				"count": 3,
				"product": {
					"id": "76e3acca-b997-4839-bc46-6fa81f50ea3b",
					"name": "Rustic Concrete Chair",
					"price": 545,
					"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
					"category": "Beauty",
					"rating": 0.1847300364170223,
					"numReviews": 44,
					"countInStock": 0
				}
			},
			{
				"id": "4f3c9918-f40a-468b-aaf3-06d9ce22a245",
				"orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
				"productId": "7318e6c3-8520-4b2f-a77c-a53c659adec7",
				"price": 237,
				"count": 4,
				"product": {
					"id": "7318e6c3-8520-4b2f-a77c-a53c659adec7",
					"name": "Luxurious Soft Keyboard",
					"price": 237,
					"description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
					"category": "Tools",
					"rating": 4.224988993955776,
					"numReviews": 94,
					"countInStock": 17
				}
			},
			{
				"id": "f4ae5e7b-f138-4673-9ec1-e9d7c9532d53",
				"orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
				"productId": "5c276656-5b73-4a39-8a6b-6e191929ff80",
				"price": 106,
				"count": 1,
				"product": {
					"id": "5c276656-5b73-4a39-8a6b-6e191929ff80",
					"name": "Small Bronze Ball",
					"price": 106,
					"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
					"category": "Grocery",
					"rating": 3.148447331041098,
					"numReviews": 14,
					"countInStock": 4
				}
			},
			{
				"id": "feb0bd2c-ddfd-4cf5-84fa-4b9b6f3786c6",
				"orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
				"productId": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
				"price": 758,
				"count": 3,
				"product": {
					"id": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
					"name": "Recycled Fresh Chicken",
					"price": 758,
					"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
					"category": "Electronics",
					"rating": 4.467650192091241,
					"numReviews": 98,
					"countInStock": 93
				}
			}
		]
	},
	{
		"id": "10742929-0a7b-4f27-a232-be413e21f6ec",
		"userId": "6dee7d92-9e43-4e20-9a41-8b815fb812a3",
		"total": 8290,
		"time": "2023-07-11T12:56:29.698Z",
		"user": {
			"id": "6dee7d92-9e43-4e20-9a41-8b815fb812a3",
			"firstName": "Jared",
			"lastName": "Harber",
			"phoneNumber": "998.845.6845 x38703",
			"email": "Jared_Harber@hotmail.com"
		},
		"items": [
			{
				"id": "8962f123-699f-4916-9171-16b52e56aa55",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "87b48b08-f96a-400b-8142-325ab233cd9f",
				"price": 382,
				"count": 2,
				"product": {
					"id": "87b48b08-f96a-400b-8142-325ab233cd9f",
					"name": "Elegant Frozen Mouse",
					"price": 382,
					"description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
					"category": "Garden",
					"rating": 2.888303007930517,
					"numReviews": 17,
					"countInStock": 98
				}
			},
			{
				"id": "c40c3780-7dad-4002-a96a-e23250283d8d",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "87b48b08-f96a-400b-8142-325ab233cd9f",
				"price": 382,
				"count": 4,
				"product": {
					"id": "87b48b08-f96a-400b-8142-325ab233cd9f",
					"name": "Elegant Frozen Mouse",
					"price": 382,
					"description": "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
					"category": "Garden",
					"rating": 2.888303007930517,
					"numReviews": 17,
					"countInStock": 98
				}
			},
			{
				"id": "5c99bbd3-1604-4216-b926-7f9950e84678",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "b0f11fba-922a-4e89-a342-b86a510a0b2b",
				"price": 868,
				"count": 1,
				"product": {
					"id": "b0f11fba-922a-4e89-a342-b86a510a0b2b",
					"name": "Fantastic Steel Bike",
					"price": 868,
					"description": "The Football Is Good For Training And Recreational Purposes",
					"category": "Books",
					"rating": 0.0952134607359767,
					"numReviews": 34,
					"countInStock": 0
				}
			},
			{
				"id": "6ab7fea7-908d-4077-884a-d39f1c3c3570",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "e87e9df8-e02a-4e8f-bb91-3442755f7d25",
				"price": 538,
				"count": 4,
				"product": {
					"id": "e87e9df8-e02a-4e8f-bb91-3442755f7d25",
					"name": "Unbranded Plastic Shirt",
					"price": 538,
					"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
					"category": "Movies",
					"rating": 3.933843702543527,
					"numReviews": 86,
					"countInStock": 45
				}
			},
			{
				"id": "179a1784-87df-419a-8f9e-d6721725d4fc",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "df2ba433-b3bf-4ecf-8b0d-e5c847664ca3",
				"price": 998,
				"count": 2,
				"product": {
					"id": "df2ba433-b3bf-4ecf-8b0d-e5c847664ca3",
					"name": "Oriental Granite Chicken",
					"price": 998,
					"description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
					"category": "Toys",
					"rating": 2.114183404482901,
					"numReviews": 73,
					"countInStock": 3
				}
			},
			{
				"id": "acbe71d4-1de5-4e63-9ec1-38224126b690",
				"orderId": "10742929-0a7b-4f27-a232-be413e21f6ec",
				"productId": "576d6f88-af96-4883-8f17-ef7e0a70fefd",
				"price": 982,
				"count": 1,
				"product": {
					"id": "576d6f88-af96-4883-8f17-ef7e0a70fefd",
					"name": "Elegant Wooden Pants",
					"price": 982,
					"description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
					"category": "Automotive",
					"rating": 0.3989565907977521,
					"numReviews": 19,
					"countInStock": 8
				}
			}
		]
	},...
]
```

To **CREATE** a new order, use `POST` method on the same route, sending order data in the _body_, as in the instruction below:

```json
{
  "userId": "39908a96-9567-43d5-863f-ede7cb620542",
  "items": [
    {
      "productId": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
      "price": 300.0,
      "count": 2
    },
    {
      "productId": "7f074836-6dbb-458c-bf24-b70289b44ef1",
      "price": 20.0,
      "count": 3
    }
  ],
  "time": "2024-09-25T17:26:49.504Z"
}
```

There is a check if the user exists in the database, if it does not exist the `status code 404` is returned with the `User not found` message.
There is also a check if the products added to the order exist in the database, if they do not exist it is returned `status code 404` and the message `Product not found`.

To calculate the total, I implement a **utility function** that makes a reduce from the quantity and values ​​of products.

If the validation is ok, it is returned `status code 201` with the message `Order created successfully`.

To **SEARCH** for a order's data by their **ID** can be accessed through a `GET` method on the route `/api/orders/getUserById`, sending the order id as a search param, as in the example below:

```
/api/orders/getOrder?id=3058ffb5-a1b5-473f-b74b-d44b0a42b40d
```

There is a check whether an id was provided for the database search to be carried out, and if the order is not found, it is returned a `status code 404` with the `Order not found` message. Order information is returned as below:

```json
{
  "id": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
  "userId": "c12f95dd-9446-48bc-b124-9e0142d53820",
  "total": 4963,
  "time": "2024-04-25T17:26:49.504Z",
  "user": {
    "id": "c12f95dd-9446-48bc-b124-9e0142d53820",
    "firstName": "Owen",
    "lastName": "Towne",
    "phoneNumber": "561-250-5099 x94990",
    "email": "Owen_Towne@yahoo.com"
  },
  "items": [
    {
      "id": "547aeb29-63da-40ad-b13c-16315b80062f",
      "orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
      "productId": "76e3acca-b997-4839-bc46-6fa81f50ea3b",
      "price": 545,
      "count": 3,
      "product": {
        "id": "76e3acca-b997-4839-bc46-6fa81f50ea3b",
        "name": "Rustic Concrete Chair",
        "price": 545,
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "category": "Beauty",
        "rating": 0.1847300364170223,
        "numReviews": 44,
        "countInStock": 0
      }
    },
    {
      "id": "4f3c9918-f40a-468b-aaf3-06d9ce22a245",
      "orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
      "productId": "7318e6c3-8520-4b2f-a77c-a53c659adec7",
      "price": 237,
      "count": 4,
      "product": {
        "id": "7318e6c3-8520-4b2f-a77c-a53c659adec7",
        "name": "Luxurious Soft Keyboard",
        "price": 237,
        "description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
        "category": "Tools",
        "rating": 4.224988993955776,
        "numReviews": 94,
        "countInStock": 17
      }
    },
    {
      "id": "f4ae5e7b-f138-4673-9ec1-e9d7c9532d53",
      "orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
      "productId": "5c276656-5b73-4a39-8a6b-6e191929ff80",
      "price": 106,
      "count": 1,
      "product": {
        "id": "5c276656-5b73-4a39-8a6b-6e191929ff80",
        "name": "Small Bronze Ball",
        "price": 106,
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "category": "Grocery",
        "rating": 3.148447331041098,
        "numReviews": 14,
        "countInStock": 4
      }
    },
    {
      "id": "feb0bd2c-ddfd-4cf5-84fa-4b9b6f3786c6",
      "orderId": "e4e7b94e-30c6-4f72-896b-96ea64d15406",
      "productId": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
      "price": 758,
      "count": 3,
      "product": {
        "id": "bf0c09a7-dfdc-4755-8e79-bb56725c94cf",
        "name": "Recycled Fresh Chicken",
        "price": 758,
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "category": "Electronics",
        "rating": 4.467650192091241,
        "numReviews": 98,
        "countInStock": 93
      }
    }
  ]
}
```

Lastly I implemented the **DELETE** method, using the method `DELETE` on the route `/api/orders/delete`, sending the order id as a search param.
