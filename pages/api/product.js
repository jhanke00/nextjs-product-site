const express = require('express');
const app = express();
const utils = require('..\\..\\src\\utils\\product.js');
const port = 8000;

/* Retrives all available product list - small */
app.get('/api/product/small/productList', (req, res) => {
  res.send(utils.productList('small'));
});

/* Retrives single product by id - small */
app.get('/api/product/small/id/:id', (req, res) => {
  const productFound = utils.singleProductSmall(req.params.id);
  if (productFound.length == 0) {
    res.status(404).json({ error: 'Product Not Found' });
  } else {
    res.send(productFound);
  }
});

/* Retrives products based on query [?q=Gorgeous] - small */
app.get('/api/product/small/query', (req, res) => {
  const searchQuery = req.query.q;
  console.log('serch stat: ', searchQuery);
  if (!searchQuery) {
    res.status(400).json({ error: 'Query parameter q is required' });
  } else {
    res.send(utils.searchProduct(searchQuery));
  }
});

/* Retrives all available product list - Large */
app.get('/api/product/large/productList', (req, res) => {
  res.send(utils.productList('large'));
});

/* Retrives single product by id - Large */
app.get('/api/product/large/id/:id', (req, res) => {
  const productFound = utils.singleProductLarge(req.params.id);
  if (productFound.length == 0) {
    res.status(404).json({ error: 'Product Not Found' });
  } else {
    res.send(productFound);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
