# Docker commands on project

## `pnpm docker-build`

Builds the Docker images specified in the `docker-compose.yml` file located in the `infra` directory.

## `pnpm docker-up`

Starts the services defined in the `docker-compose.yml` file, bringing the application up.

## `pnpm docker-down`

Stops and removes the containers defined in the `docker-compose.yml` file, effectively taking the application down.

## `pnpm docker-restart`

Restarts the services defined in the `docker-compose.yml` file, useful for applying configuration changes.

## `pnpm docker-logs`

Displays the logs from the containers defined in the `docker-compose.yml` file, helping with debugging.

## `pnpm docker-exec`

Executes a shell (`sh`) inside the `nextjs` container, allowing you to interact with the running application.
