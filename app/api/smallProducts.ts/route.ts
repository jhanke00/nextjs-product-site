import express from 'express';
const app = express();
import { smallProductList } from './smallProductListController.js';
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

/* Retrieve all available product list - small */
app.get('api/v1/products', smallProductList.get);
app.get('api/v1/products/:id', smallProductList.getById);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
