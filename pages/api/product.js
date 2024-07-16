const express = require('express');
const app = express();
const utils = require('..\\..\\src\\utils\\product.js');
const port = 8000;

// Middleware to parse JSON bodies
app.use(express.json());

/* Retrieve all available product list - small */
app.get('/api/product/small/productList', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const result = utils.productList('small', page, limit);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Retrieve single product by id - small */
app.get('/api/product/small/id/:id', (req, res) => {
  const productId = req.params.id;
  try {
    const productFound = utils.singleProductSmall(productId);
    if (!productFound) {
      res.status(404).json({ error: 'Product Not Found' });
    } else {
      res.send(productFound);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Retrieve products based on query [?q=Gorgeous] - small */
app.get('/api/product/small/query', (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    res.status(400).json({ error: 'Query parameter q is required' });
  } else {
    try {
      const result = utils.searchProduct(searchQuery);
      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

/* Retrieve all available product list - Large */
app.get('/api/product/large/productList', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const result = utils.productList('large', page, limit);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Retrieve single product by id - Large */
app.get('/api/product/large/id/:id', (req, res) => {
  const productId = req.params.id;
  try {
    const productFound = utils.singleProductLarge(productId);
    if (!productFound) {
      res.status(404).json({ error: 'Product Not Found' });
    } else {
      res.send(productFound);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
