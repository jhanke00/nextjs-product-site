## Product Search API

A new API is created to handle user search query requests. Instead of loading the mock data on every request to the frontend, I have created an API to serve only what is requested.

The API sends only 15 results to not overload the network payload. Pagination feature is introduced to navigate easily for the requested data.
