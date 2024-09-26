# Docker

- [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

You can read more about docker in the [Docker Documentation](https://docs.docker.com/)

## Commands

To start the services defined on **docker-compose.yml** file, located on infra directory, run the command:
`pnpm run docker-up`. Your docker will run on port `5432`.

To stop the services, run `pnpm run docker-stop`.

If you want to kill the db, use `pnpm run docker-down`.

Im using **bitnami/postgresql** image for db.
