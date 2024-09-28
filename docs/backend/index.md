# Backend

1- Creating products route find by id `(/products/:id)`

This route was built using several DDD principles. As you can see, all dependencies are injected, and they are not directly tied to external libraries. This ensures that the source code remains secure and insulated from external influences.

2- Creating products route to list all and paginate `(/products?limit=?&page?)`


This route allows users to list all products stored in the database, following the same principles as previous routes by segregating core logic from the outside world. Additionally, utility functions for pagination have been implemented.