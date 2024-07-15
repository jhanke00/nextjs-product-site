const smallProductsData = require('..\\mock\\small\\products.json');

const largeProductsData = require('..\\mock\\large\\products.json');

function productList(type) {
  if (type === 'small') {
    return smallProductsData;
  }
  if (type === 'large') {
    return largeProductsData;
  }
}

function singleProduct(id, productData) {
  let productInfo = productData.filter((item) => item.id === id);
  console.log('returned item from mock : ', productInfo);
  return productInfo;
}

function singleProductSmall(id) {
  return singleProduct(id, smallProductsData);
}

function singleProductLarge(id) {
  return singleProduct(id, largeProductsData);
}

function searchProduct(query) {
  let filteredProduct = smallProductsData.filter((product) =>
    product.name.toLowerCase().startsWith(query.toLowerCase())
  );
  console.log('returned item from mock : ', filteredProduct);

  if (filteredProduct.length == 0) {
    return 'No Product Found with query';
  }
  return filteredProduct;
}

module.exports = {
  productList: productList,
  searchProduct: searchProduct,
  singleProductSmall: singleProductSmall,
  singleProductLarge: singleProductLarge,
};
