import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../globals.css';
import ProductsDisplay from '@/src/components/products';

const PAGE_SIZE = 20;

const Products = () => {
  const [dataDisplayed, setDataDisplayed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (direction: 1 | -1) => {
    setCurrentPage(currentPage + direction);
  };

  useEffect(() => {
    fetch(`/api/products?limit=${PAGE_SIZE}&skip=0`)
      .then((res) => res.json())
      .then((data) => {
        setDataDisplayed(data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/products?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * (currentPage - 1)}`)
      .then((res) => res.json())
      .then((data) => {
        setDataDisplayed(data);
        window.scrollTo(0, 0);
      });
  }, [currentPage]);

  return (
    <>
      <div className='flex justify-end m-12 hover:ml-2'>
        <Link href={`/products/search`}>{'SEARCH PRODUCTS ->'}</Link>
      </div>
      <h1 className={`mb-3 text-2xl font-semibold text-center`}>All Products</h1>
      <main className='flex min-h-screen flex-col lg:grid-cols-2 p-24'>
        <ProductsDisplay dataDisplayed={dataDisplayed} />
      </main>
      <div className='flex justify-around w-full border-t-2 pt-4'>
        <button onClick={() => changePage(-1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => changePage(1)} disabled={dataDisplayed.length < PAGE_SIZE}>
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
