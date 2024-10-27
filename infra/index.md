# Setup Documentation

This document outlines the steps to configure and run the project using Docker and environment variables.

## Environment Variables

1. **Create a `.env` file** in the root directory of the project with the following content:

```dotenv
DATABASE_URL="mongodb://admin:password@localhost:27017/product?authSource=admin&directConnection=true"
JWT_SECRET=ads12f@$fs3@ASfads
```

## Docker Setup

To set up the project using Docker, run the following command:

```bash
docker-compose -f infra/docker/docker-compose.yml up -d
```

##Verify Container Status
To check if the containers are running successfully, execute:

```bash
docker ps
```

##Generate mock data
To generate mock data, run the following command:

```bash
pnpm run generate-data
```

##Seed Database
To populate the database with initial data such as products, orders, and users, run the following command:

```bash
pnpm run seed
```
