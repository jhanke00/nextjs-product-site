import { type NextRequest } from 'next/server';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';

const PAGE_SIZE = 15;

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const page = searchParams.get('page');
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minReviews = searchParams.get('minReviews');
  const minRating = searchParams.get('minRating');

  const startIndex = (parseInt(page as string) - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  if (query !== null) {
    const productData = [...largeData, ...smallData];

    let filteredProducts = productData.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

    // Filter products based on category
    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    // Filter products based on price range
    if (Number(minPrice)) {
      filteredProducts = filteredProducts.filter((product) => Number(product.price) >= Number(minPrice));
    }

    if (Number(maxPrice)) {
      filteredProducts = filteredProducts.filter((product) => Number(product.price) <= Number(maxPrice));
    }

    // Filter products based on minimum reviews
    if (minReviews) {
      filteredProducts = filteredProducts.filter((product) => product.numReviews >= parseInt(minReviews as string));
    }

    // Filter products based on minimum rating
    if (minRating) {
      filteredProducts = filteredProducts.filter((product) => product.rating >= parseInt(minRating as string));
    }

    /* if (filteredProducts.length == 0) {
            return Response.json("No products found!", {
                status: 404,
            })
        } */
    // Sending a 404 status code breaks the code when no results found.

    return Response.json(filteredProducts.slice(startIndex, endIndex));
  }
}
