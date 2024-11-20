import { getProducts, type GetProductsProps } from "@/src/utils/get-products"

type SearchedProductProps = {
  searchParams?: {
    [key: string]: string
  }
}

export function SearchedProduct({ searchParams }: SearchedProductProps) {
  const hasSearchParams = Object.keys(searchParams || {})?.length

  if (!hasSearchParams) return <></>

  const products = getProducts(searchParams as GetProductsProps)

  return (
    <section data-testid='searched-product-section' className="flex gap-2 flex-wrap items-start max-h-[500px] overflow-auto" >
      {products.map(product => (
        <article className='flex flex-col p-10' key={product.id}>
          <h1 className='text-2xl font-semibold'>Product Description</h1>
          <h3 className={`mb-3 text-xl `}>{product.name}</h3>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price}</p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description}</p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category}</p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating}</p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews}</p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock}</p>
        </article>
      ))}
    </section>
  )
}