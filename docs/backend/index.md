# Backend

After following all the steps in the infrastructure documentation, which contains the [docker instructions](./../infrastructure/docker/docker-instructions.md) and the [prisma instructions](./../infrastructure/prisma/prisma-instructions.md), you're ready to proceed with the API requests.

# Routes

## Users `/api/users`

In this route you can make request to `fetch` all users and `create` a new user.

To **FETCH** you need to do use the `GET` method in `/api/users`, and you will receive the data in the format below:

```json
[
	{
		"id": "fd7398ab79684a1cadfb142d",
		"firstName": "Caroline",
		"lastName": "Swift",
		"phoneNumber": "1-446-490-1781 x3745",
		"email": "Caroline_Swift50@hotmail.com"
	},
	{
		"id": "24e1899b101d4580acd870fc",
		"firstName": "Meredith",
		"lastName": "O'Reilly",
		"phoneNumber": "(467) 651-1451 x721",
		"email": "Meredith_OReilly13@hotmail.com"
	},
	{
		"id": "a109278c9f004d88a5e60ac8",
		"firstName": "Raul",
		"lastName": "Dare",
		"phoneNumber": "(479) 445-7179 x803",
		"email": "Raul.Dare@hotmail.com"
	},
	{
		"id": "23c9802c90c740359477c75e",
		"firstName": "Ansel",
		"lastName": "Buckridge",
		"phoneNumber": "859.884.1524 x865",
		"email": "Ansel.Buckridge@gmail.com"
	},
	{
		"id": "2b6221e141414c8398b28efb",
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
/api/users/getUserById?id=fd7398ab79684a1cadfb142d30b6a936
```

There is a check whether an id was provided for the database search to be carried out, and if the user is not found, it is returned a `status code 404` with the `User not found` message. User information is returned as below:

```json
{
  "id": "fd7398ab79684a1cadfb142d30b6a936",
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
		"id": "bf0c09a7dfdc47558e79bb56",
		"name": "Recycled Fresh Chicken",
		"price": 758,
		"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
		"category": "Electronics",
		"rating": 4.467650192091241,
		"numReviews": 98,
		"countInStock": 93
	},
	{
		"id": "7f0748366dbb458cbf24b702",
		"name": "Oriental Wooden Ball",
		"price": 722,
		"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
		"category": "Clothing",
		"rating": 3.364421250298619,
		"numReviews": 54,
		"countInStock": 60
	},
	{
		"id": "fa6d6100b2db4d65a02206b9",
		"name": "Modern Cotton Cheese",
		"price": 35,
		"description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
		"category": "Jewelery",
		"rating": 2.045221213484183,
		"numReviews": 80,
		"countInStock": 65
	},
	{
		"id": "d7fe8e4c6aae4385bd332372",
		"name": "Ergonomic Soft Shirt",
		"price": 471,
		"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
		"category": "Automotive",
		"rating": 0.6600435834843665,
		"numReviews": 17,
		"countInStock": 68
	},
	{
		"id": "56a4c2198f0542ada40348a5",
		"name": "Unbranded Wooden Bike",
		"price": 851,
		"description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
		"category": "Movies",
		"rating": 2.232249873923138,
		"numReviews": 99,
		"countInStock": 0
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
  "id": "bf0c09a7dfdc47558e79bb56725c94cf",
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
		"id": "66f836a84e3235df4f4211fa",
		"userId": "c12f95dd944648bcb1249e01",
		"total": 4963,
		"time": "2024-04-25T17:26:49.504Z",
		"user": {
			"id": "c12f95dd944648bcb1249e01",
			"firstName": "Owen",
			"lastName": "Towne",
			"phoneNumber": "561-250-5099 x94990",
			"email": "Owen_Towne@yahoo.com"
		},
		"items": [
			{
				"id": "66f836a94e3235df4f4211fb",
				"productId": "76e3accab9974839bc466fa8",
				"count": 3,
				"orderId": "66f836a84e3235df4f4211fa",
				"price": 545,
				"product": {
					"id": "76e3accab9974839bc466fa8",
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
				"id": "66f836a94e3235df4f4211fc",
				"productId": "7318e6c385204b2fa77ca53c",
				"count": 4,
				"orderId": "66f836a84e3235df4f4211fa",
				"price": 237,
				"product": {
					"id": "7318e6c385204b2fa77ca53c",
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
				"id": "66f836a94e3235df4f4211fd",
				"productId": "5c2766565b734a398a6b6e19",
				"count": 1,
				"orderId": "66f836a84e3235df4f4211fa",
				"price": 106,
				"product": {
					"id": "5c2766565b734a398a6b6e19",
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
				"id": "66f836a94e3235df4f4211fe",
				"productId": "bf0c09a7dfdc47558e79bb56",
				"count": 3,
				"orderId": "66f836a84e3235df4f4211fa",
				"price": 758,
				"product": {
					"id": "bf0c09a7dfdc47558e79bb56",
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
		"id": "66f836a94e3235df4f4211ff",
		"userId": "6dee7d929e434e209a418b81",
		"total": 8290,
		"time": "2023-07-11T12:56:29.698Z",
		"user": {
			"id": "6dee7d929e434e209a418b81",
			"firstName": "Jared",
			"lastName": "Harber",
			"phoneNumber": "998.845.6845 x38703",
			"email": "Jared_Harber@hotmail.com"
		},
		"items": [
			{
				"id": "66f836a94e3235df4f421200",
				"productId": "87b48b08f96a400b8142325a",
				"count": 2,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 382,
				"product": {
					"id": "87b48b08f96a400b8142325a",
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
				"id": "66f836a94e3235df4f421201",
				"productId": "87b48b08f96a400b8142325a",
				"count": 4,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 382,
				"product": {
					"id": "87b48b08f96a400b8142325a",
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
				"id": "66f836a94e3235df4f421202",
				"productId": "b0f11fba922a4e89a342b86a",
				"count": 1,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 868,
				"product": {
					"id": "b0f11fba922a4e89a342b86a",
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
				"id": "66f836a94e3235df4f421203",
				"productId": "e87e9df8e02a4e8fbb913442",
				"count": 4,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 538,
				"product": {
					"id": "e87e9df8e02a4e8fbb913442",
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
				"id": "66f836a94e3235df4f421204",
				"productId": "df2ba433b3bf4ecf8b0de5c8",
				"count": 2,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 998,
				"product": {
					"id": "df2ba433b3bf4ecf8b0de5c8",
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
				"id": "66f836a94e3235df4f421205",
				"productId": "576d6f88af9648838f17ef7e",
				"count": 1,
				"orderId": "66f836a94e3235df4f4211ff",
				"price": 982,
				"product": {
					"id": "576d6f88af9648838f17ef7e",
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
	},
	{
		"id": "66f836a94e3235df4f421206",
		"userId": "95e624f2fdfb45cabbd5ee0f",
		"total": 2433,
		"time": "2024-08-17T17:24:14.104Z",
		"user": {
			"id": "95e624f2fdfb45cabbd5ee0f",
			"firstName": "Verla",
			"lastName": "Sawayn",
			"phoneNumber": "(510) 837-6790 x3618",
			"email": "Verla_Sawayn66@hotmail.com"
		},
		"items": [
			{
				"id": "66f836a94e3235df4f421207",
				"productId": "1efd3555e66d46079c493977",
				"count": 4,
				"orderId": "66f836a94e3235df4f421206",
				"price": 549,
				"product": {
					"id": "1efd3555e66d46079c493977",
					"name": "Unbranded Plastic Bike",
					"price": 549,
					"description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
					"category": "Jewelery",
					"rating": 0.4477015777956694,
					"numReviews": 84,
					"countInStock": 91
				}
			},
			{
				"id": "66f836a94e3235df4f421208",
				"productId": "7318e6c385204b2fa77ca53c",
				"count": 1,
				"orderId": "66f836a94e3235df4f421206",
				"price": 237,
				"product": {
					"id": "7318e6c385204b2fa77ca53c",
					"name": "Luxurious Soft Keyboard",
					"price": 237,
					"description": "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
					"category": "Tools",
					"rating": 4.224988993955776,
					"numReviews": 94,
					"countInStock": 17
				}
			}
		]
	},
	{
		"id": "66f836a94e3235df4f421209",
		"userId": "1138f46eb5d84c25a1d4fc01",
		"total": 2505,
		"time": "2024-03-01T07:47:59.453Z",
		"user": {
			"id": "1138f46eb5d84c25a1d4fc01",
			"firstName": "Cameron",
			"lastName": "Shields",
			"phoneNumber": "775.401.4006 x71935",
			"email": "Cameron.Shields71@hotmail.com"
		},
		"items": [
			{
				"id": "66f836a94e3235df4f42120a",
				"productId": "df2ba433b3bf4ecf8b0de5c8",
				"count": 2,
				"orderId": "66f836a94e3235df4f421209",
				"price": 998,
				"product": {
					"id": "df2ba433b3bf4ecf8b0de5c8",
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
				"id": "66f836a94e3235df4f42120b",
				"productId": "c249c9ad36fb4caf8a1734f0",
				"count": 1,
				"orderId": "66f836a94e3235df4f421209",
				"price": 49,
				"product": {
					"id": "c249c9ad36fb4caf8a1734f0",
					"name": "Luxurious Granite Bike",
					"price": 49,
					"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
					"category": "Beauty",
					"rating": 4.904592487728223,
					"numReviews": 40,
					"countInStock": 40
				}
			},
			{
				"id": "66f836a94e3235df4f42120c",
				"productId": "e720b53bb5984bf6a0c7697f",
				"count": 2,
				"orderId": "66f836a94e3235df4f421209",
				"price": 230,
				"product": {
					"id": "e720b53bb5984bf6a0c7697f",
					"name": "Electronic Soft Car",
					"price": 230,
					"description": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
					"category": "Clothing",
					"rating": 4.734278944088146,
					"numReviews": 97,
					"countInStock": 36
				}
			}
		]
	},
	{
		"id": "66f836a94e3235df4f42120d",
		"userId": "9ba59fbfe4354ef89a6af5f5",
		"total": 2847,
		"time": "2023-02-28T15:25:35.449Z",
		"user": {
			"id": "9ba59fbfe4354ef89a6af5f5",
			"firstName": "Rowena",
			"lastName": "Kunze",
			"phoneNumber": "(291) 584-9813 x308",
			"email": "Rowena_Kunze20@yahoo.com"
		},
		"items": [
			{
				"id": "66f836a94e3235df4f42120e",
				"productId": "c5aee834a22a4ea785bacc20",
				"count": 4,
				"orderId": "66f836a94e3235df4f42120d",
				"price": 451,
				"product": {
					"id": "c5aee834a22a4ea785bacc20",
					"name": "Electronic Cotton Keyboard",
					"price": 451,
					"description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
					"category": "Games",
					"rating": 1.091434810077772,
					"numReviews": 74,
					"countInStock": 64
				}
			},
			{
				"id": "66f836a94e3235df4f42120f",
				"productId": "3e548ed679624eb5aece248c",
				"count": 1,
				"orderId": "66f836a94e3235df4f42120d",
				"price": 16,
				"product": {
					"id": "3e548ed679624eb5aece248c",
					"name": "Gorgeous Wooden Shoes",
					"price": 16,
					"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
					"category": "Industrial",
					"rating": 4.52173266094178,
					"numReviews": 45,
					"countInStock": 62
				}
			},
			{
				"id": "66f836a94e3235df4f421210",
				"productId": "bc2134da814e43c78306a002",
				"count": 1,
				"orderId": "66f836a94e3235df4f42120d",
				"price": 482,
				"product": {
					"id": "bc2134da814e43c78306a002",
					"name": "Recycled Soft Pants",
					"price": 482,
					"description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
					"category": "Electronics",
					"rating": 1.755844865692779,
					"numReviews": 76,
					"countInStock": 40
				}
			},
			{
				"id": "66f836a94e3235df4f421211",
				"productId": "76e3accab9974839bc466fa8",
				"count": 1,
				"orderId": "66f836a94e3235df4f42120d",
				"price": 545,
				"product": {
					"id": "76e3accab9974839bc466fa8",
					"name": "Rustic Concrete Chair",
					"price": 545,
					"description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
					"category": "Beauty",
					"rating": 0.1847300364170223,
					"numReviews": 44,
					"countInStock": 0
				}
			}
		]
	},...
]
```

To **CREATE** a new order, use `POST` method on the same route, sending order data in the _body_, as in the instruction below:

```json
{
  "userId": "39908a96956743d5863fede7cb620542",
  "items": [
    {
      "productId": "bf0c09a7dfdc47558e79bb56725c94cf",
      "price": 300.0,
      "count": 2
    },
    {
      "productId": "7f0748366dbb458cbf24b70289b44ef1",
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
/api/orders/getOrder?id=3058ffb5a1b5473fb74bd44b0a42b40d
```

There is a check whether an id was provided for the database search to be carried out, and if the order is not found, it is returned a `status code 404` with the `Order not found` message. Order information is returned as below:

```json
{
  "id": "66f836a84e3235df4f4211fa",
  "userId": "c12f95dd944648bcb1249e01",
  "total": 4963,
  "time": "2024-04-25T17:26:49.504Z",
  "user": {
    "id": "c12f95dd944648bcb1249e01",
    "firstName": "Owen",
    "lastName": "Towne",
    "phoneNumber": "561-250-5099 x94990",
    "email": "Owen_Towne@yahoo.com"
  },
  "items": [
    {
      "id": "66f836a94e3235df4f4211fb",
      "productId": "76e3accab9974839bc466fa8",
      "count": 3,
      "orderId": "66f836a84e3235df4f4211fa",
      "price": 545,
      "product": {
        "id": "76e3accab9974839bc466fa8",
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
      "id": "66f836a94e3235df4f4211fc",
      "productId": "7318e6c385204b2fa77ca53c",
      "count": 4,
      "orderId": "66f836a84e3235df4f4211fa",
      "price": 237,
      "product": {
        "id": "7318e6c385204b2fa77ca53c",
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
      "id": "66f836a94e3235df4f4211fd",
      "productId": "5c2766565b734a398a6b6e19",
      "count": 1,
      "orderId": "66f836a84e3235df4f4211fa",
      "price": 106,
      "product": {
        "id": "5c2766565b734a398a6b6e19",
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
      "id": "66f836a94e3235df4f4211fe",
      "productId": "bf0c09a7dfdc47558e79bb56",
      "count": 3,
      "orderId": "66f836a84e3235df4f4211fa",
      "price": 758,
      "product": {
        "id": "bf0c09a7dfdc47558e79bb56",
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
