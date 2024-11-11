import productsSmallData from '../mock/small/products.json';
import productsLargeData from '../mock/large/products.json';

let products = [...productsSmallData, ...productsLargeData];

/**
 * Returns the list of products, with optional pagination.
 * @param {number | null} limit - The number of products to return. If null, returns all products.
 * @param {number} offset - The number of products to skip before returning.
 * @returns {Product[]} - The list of products.
 */
export function getProducts(limit: number | null = null, offset = 0) {
  if (limit === null) {
    return products;
  }
  return products.slice(offset, offset + limit);
}

/**
 * Retrieves a product by its ID.
 * @param {string} id - The unique identifier of the product to retrieve.
 * @returns {Product | null} - The product with the specified ID, or null if not found.
 */
export function getProductById(id: string) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }

  return products[index];
}

/**
 * Searches for products whose name starts with the given query.
 * @param {string} query - The query to search for.
 * @param {number | null} limit - The number of products to return. If null, returns all products.
 * @param {number} offset - The number of products to skip before returning.
 * @returns {Product[]} - The list of products that match the query.
 */
export function searchProducts(query: string, limit: number | null = null, offset = 0) {
  if (!query) {
    return [];
  }
  const lowerCaseQuery = query.toLowerCase();
  if (limit === null) {
    return products.filter((product) => product.name.toLowerCase().startsWith(lowerCaseQuery));
  }
  return products
    .filter((product) => product.name.toLowerCase().startsWith(lowerCaseQuery))
    .slice(offset, offset + limit);
}
