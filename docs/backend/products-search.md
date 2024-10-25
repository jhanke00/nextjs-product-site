# Products search and filter

The search and filter feature is built on top of the products endpoint. It works by parsing the query params in the URL and using those to search and/or filter the products. By storing this application state in the URL, the implementation not only becomes more friendly to the RSC usage, but also for the user, who is able to save and/or share the URL with the search and filter state.

We use [nuqs](https://nuqs.47ng.com/docs/server-side) to parse the query params to the correct types, and [zod](https://zod.dev/) to validate them and make sure they are safe to use within the application. Some optimizations where made to ensure application performance and user experience, such as:

1. Debouncing user input to avoid unnecessary requests.
2. Data fetching once the page component, in parallel, avoiding additional requests in the react tree and also avoiding request chains.
3. Database indexes on the fields that are being searched and/or filtered, Including an index for performing multiple keyword searches on the product name.
4. A loading state to the search results, to provide feedback to the user that the search is being performed and avoiding interaction while the page is loading.
