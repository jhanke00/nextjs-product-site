# Use the official MongoDB 4.4.29 image
FROM mongo:4.4.29

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the JSON files into the container
COPY ./src/mock/small/orders.json ./orders.json
COPY ./src/mock/small/products.json ./products.json
COPY ./src/mock/small/users.json ./users.json

# Copy the init-mongo.sh script into the appropriate directory
COPY ./infra/products/init-mongo.sh /docker-entrypoint-initdb.d/

# Expose MongoDB default port
EXPOSE 27017
