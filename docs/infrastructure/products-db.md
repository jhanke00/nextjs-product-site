# Purpose of Dockerfile
The Dockerfile is included in the repository to facilitate the setup and deployment of the MongoDB database for the project. By defining the Dockerfile, we ensure consistency in the development, testing, and production environments. Docker allows us to package the MongoDB database along with its dependencies and configurations into a portable container, making it easy to deploy across different platforms.

Why MongoDB?
MongoDB is chosen as the database solution for the project due to its flexibility, scalability, and ease of use. MongoDB is a NoSQL document-oriented database that allows for storing and querying JSON-like documents, making it well-suited for handling semi-structured data such as product information, user profiles, and orders. Additionally, MongoDB's horizontal scalability and replica set architecture provide high availability and fault tolerance, making it suitable for handling large volumes of data and supporting the project's growth over time.

Initialization of Collections in MongoDB
To initialize the collections in the MongoDB database, we use an initialization script named init-mongo.sh. This script is executed when the MongoDB Docker container is started for the first time. The script performs the following tasks:

Create Collections: The script connects to the MongoDB server and creates three collections named users, orders, and products within the next-product-site database.

Import Data: After creating the collections, the script imports data from JSON files (orders.json, products.json, and users.json) into their respective collections. These JSON files contain sample data that represents orders, products, and user profiles.

By initializing the collections in this manner, we ensure that the MongoDB database is pre-populated with data required for development, testing, and demonstration purposes. This simplifies the setup process for developers and ensures consistency across environments.

### How to create the image and run it.
From the project directory: docker build -t next-product-site-image -f infra/products/Dockerfile .
Verify image has been created: docker images
Run inside the container: docker run -d -p 27017:27017 --name mongodb-inside-container next-product-site-image

access the running mongodb instance through mongodb://localhost:27017/next-product-site 
