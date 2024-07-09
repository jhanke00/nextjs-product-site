'use client';
import React from 'react';
import Search from '@/src/components/Search';
import ProductListSkeleton from '@/src/components/ProductListSkeleton';
import useDataHook from '@/src/utils/useDataHook';
import { Suspense, useEffect, useState } from 'react';
import ProductsList from '@/src/components/ProductsList';
import BreadCrumb from '@/src/components/BreadCrumb';

export default function Productslist() {
  const { getLargeProductsList } = useDataHook();
  const [apiData, setApiData] = useState([] as any);
  const [productData, setProductData] = useState([] as any);
  const [categories, setCategories] = useState([]);
  const [reset, setReset] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchProducts = ({ searchProducts, searchByCategory }: any) => {
    setIsSearch(!isSearch);
    const filteredData = apiData.filter((products: any) => {
      const isProductsMatch = products.name.toLowerCase().includes(searchProducts.toLowerCase());
      const isCategoryMatch = products.category === searchByCategory;
      if (searchProducts !== '' && searchByCategory !== '') {
        if (isProductsMatch && isCategoryMatch) {
          return products;
        }
      } else if (searchProducts !== '') {
        if (isProductsMatch) {
          return products;
        }
      } else if (searchByCategory !== '') {
        if (isCategoryMatch) {
          return products;
        }
      } else {
        return products;
      }
    });
    setProductData(filteredData);
  };

  useEffect(() => {
    const getProductsList = async () => {
      const data = await getLargeProductsList();
      setProductData(data);
      setApiData(data);
    };
    getProductsList();
  }, []);

  useEffect(() => {
    const category = [] as any;
    if (apiData) {
      apiData.map((products: any) => {
        if (products.category !== '') {
          !category.includes(products.category) && category.push(products.category);
        }
      });
    }
    setCategories(category.sort());
  }, [apiData]);

  useEffect(() => {
    if (reset) {
      setIsSearch(!isSearch);
      const getProductsList = async () => {
        const data = await getLargeProductsList();
        setProductData(data);
      };
      getProductsList();
    }
  }, [reset]);

  return (
    <div className='w-full min-h-screen bg-gray-200 p-4'>
      <Suspense fallback={<ProductListSkeleton />}>
        <BreadCrumb
          breadcrumbs={[
            { label: 'Home', href: '/' },
            {
              label: 'Products',
              href: '/productslist',
              active: true,
            },
          ]}
        />
        <Search categories={categories} handleSearchProducts={handleSearchProducts} setReset={setReset} />
        <ProductsList productData={productData} isSearch={isSearch} />
      </Suspense>
    </div>
  );
}
