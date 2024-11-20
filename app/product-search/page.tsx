import { ProductSearch } from "@/src/components/form/product-search";
import { SearchedProduct } from "@/src/components/searched-product";


type ProductSearchPageProps = {
  searchParams?: {
    [key: string]: string
  }
}

export default function ProductSearchPage({ searchParams }: ProductSearchPageProps) {
  return (
    <main className="flex flex-col gap-10 items-center justify-center bg-zinc-900 w-full min-h-screen">
      <section className="space-y-8">
        <h1 className="text-semibold text-4xl text-center text-zinc-100">Search for a product</h1>
        <div className="w-full flex items-center justify-center">

          <ProductSearch />
        </div>
      </section>

      <SearchedProduct searchParams={searchParams} key={`searched-product-${searchParams?.name || ''}-${searchParams?.category || ''}`} />

    </main>
  )
}