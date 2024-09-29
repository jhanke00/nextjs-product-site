# Backend Features

1- Creating products route find by id `(/products/:id)`

This route was built using several DDD principles. As you can see, all dependencies are injected, and they are not directly tied to external libraries. This ensures that the source code remains secure and insulated from external influences.

2- Creating products route to list all and paginate `(/products?limit=?&page?)`

This route allows users to list all products stored in the database, following the same principles as previous routes by segregating core logic from the outside world. Additionally, utility functions for pagination have been implemented.

3- Creating `/login` and `/sign-up`

Implemented these routes using JWT and Joi packages. I followed the same steps mentioned here and didn't use them directly in the service, because we don't want external dependencies linked with the source code.

4- Middlewares
Here's the corrected version of your text:

Implemented middleware handlers. This handler allows users to send any middleware simultaneously for each route, providing more control over the routes and allowing them to have different authentications.

5- Creating Integration middleware

This middleware can be used for various purposes. In this case, I'm using it to allow someone to run the seed. Another use could be for integrating other applications with this API.

6 - New Routes for User Data and Orders

For the /me route, I used a decode middleware to extract the user's email from the token. I then called the service to retrieve the data from the repository.

All routes, except for /login and /sign-up, have authentication middleware.

### Topics I Would Like to Address but Didn't Have Time For

Improve MongoDB Repository Connection: Avoid making calls every time a connection is needed.

Create a Custom Global Error Handler: This would make it easier to implement observability tools such as Elastic or Sentry.

New Route for Seeding the Database: I added a new route to seed the database and implemented a different authentication middleware for it, demonstrating that we can divide route flows. However, I could have set up the seeding function as just a package script.

Seed Execution Time: I am not satisfied with the time it takes to run the seeding; this is a drawback I would like to improve if I had more time available.
