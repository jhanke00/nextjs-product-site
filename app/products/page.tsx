'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PAGE_SIZE = 20;

// Define the type for your product data
interface Product {
  id: { S: string };
  name: { S: string };
  price: { N: string };
  description: { S: string };
  category: { S: string };
  rating: { N: string };
  numReviews: { N: string };
  countInStock: { N: string };
}

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Product[]>([]); // Use the Product[] type for data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch('/api/getData');
        const products: Product[] = await response.json(); // Expect products of type Product[]
        setData(products);
        setError(null);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const productData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
          {productData.map((product) => (
            <div
              key={product.id.S}
              className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
              <Link href={`/products/${product.id.S}`}>
                <h3 className={`mb-3 text-2xl font-semibold`}>{product.name.S}</h3>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price.N}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description.S}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category.S}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating.N}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews.N}</p>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock.N}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
