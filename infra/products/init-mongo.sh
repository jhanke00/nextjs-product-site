#!/bin/bash

# Create the database and collections
mongo next-product-site --eval "db.createCollection('users')"
mongo next-product-site --eval "db.createCollection('orders')"
mongo next-product-site --eval "db.createCollection('products')"

# Import JSON files into collections
mongoimport --host localhost --db next-product-site --collection orders --file /usr/src/app/orders.json --jsonArray 
mongoimport --host localhost --db next-product-site --collection products --file /usr/src/app/products.json --jsonArray 
mongoimport --host localhost --db next-product-site --collection users --file /usr/src/app/users.json --jsonArray 