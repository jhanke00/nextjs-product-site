// const fs = require('fs');
const smallProductsData = require('..\\mock\\small\\products.json');

const largeProductsData = require('..\\mock\\large\\products.json');

function productList(type, page, limit) {
  let products;
  if (type === 'small') {
    products = smallProductsData;
  } else if (type === 'large') {
    products = largeProductsData;
  } else {
    throw new Error('Invalid product type');
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultProducts = products.slice(startIndex, endIndex);

  return {
    page,
    limit,
    totalNumOfProducts: products.length,
    products: resultProducts,
  };
}

function singleProduct(id, productData) {
  const productInfo = productData.filter((item) => item.id === id);
  if (productInfo.length === 0) {
    throw new Error('Product not found');
  }
  return productInfo;
}

function singleProductSmall(id) {
  return singleProduct(id, smallProductsData);
}

function singleProductLarge(id) {
  return singleProduct(id, largeProductsData);
}

function searchProduct(query) {
  const filteredProduct = smallProductsData.filter((product) =>
    product.name.toLowerCase().startsWith(query.toLowerCase())
  );

  if (filteredProduct.length === 0) {
    throw new Error('No Product Found with query');
  }
  return filteredProduct;
}

module.exports = {
  productList,
  searchProduct,
  singleProductSmall,
  singleProductLarge,
};
