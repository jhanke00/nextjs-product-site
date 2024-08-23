import { Product } from '@type/products';

const findSimilarProducts = (products: Product[], currentProduct: Product, maxResults: number = 4) => {
  return products
    .filter((product) => product.id !== currentProduct.id)
    .map((product) => {
      // Calculate similarity score
      let similarityScore = 0;

      // Match the name of the product
      if (product.name.toLowerCase().includes(currentProduct.name.split(' ')[0].toLowerCase())) {
        similarityScore += 20;
      }

      // Match category
      if (product.category === currentProduct.category) {
        similarityScore += 5;
      }

      // Match price range
      const priceDifference = Math.abs(product.price - currentProduct.price);
      if (priceDifference <= 50) {
        similarityScore += 10;
      } else if (priceDifference <= 100) {
        similarityScore -= 10;
      }

      // Match features
      // const commonFeatures = (product.rating + product.numReviews + product.countInStock) / 3;
      // similarityScore += commonFeatures;

      return { product, similarityScore };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by highest similarity score
    .slice(0, maxResults) // Limit to maxResults
    .map((item) => item.product); // Return only products
};

export default findSimilarProducts;
