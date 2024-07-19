# Infrastructure Users API

#### Setup Asumptions

You must have Makefile, Docker and docker-compose installed properly.

### Setup

1. `cp /app/api/.env.example /app/api/.env`
2. `cd /infra/users`
3. `docker-compose up --build` for running this API for the very first time or just run `docker-compose up`.
   a. You can also run `make build` for running this API for the very first time or just run `make up`.
4. It's up and running!
5. To know how to query the API or run tests, please refer to the documentation [here](../docs/backend/users-api.md)
6. To get the container down you can run `make down` or `docker-compose down`

### Clarifications

1. Why the Dockerfile is inside the `/app/api` folder and not under the `/infra` folder?
   The Readme.md file under the "Infrastructure" section states `Create a Dockerfile or docker-compose.yml for any image you want to use to manage creating local resources. (/infra/products/Dockerfile)`
   If you need to copy folders and files to your container but those folders and files are out the Dockerfile context, you will get an error: `COPY failed: forbidden path outside the build context: [/folder/you/want/to/reach]`
   That's why I created the Dockerfile inside `/app/api` folder so docker-compose.yml file can get the files necessary to create the container.

2. You could have created a docker-compose.yml file only and that had been enough.
   It's true, but I like to have Dockerfiles. I tried to keep the API like a microservice style but trying to keep the original context given. Of course I'm open to suggestions!

3. Why did you create jest.config.js - tsconfig.json - package.json files again?
   Because the same answer on 1.
   Dockerfile wasn't able to reach files and folders out of its build context.
