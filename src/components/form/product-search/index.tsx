'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ProductSearchSchemaType, productSearchSchema } from './validation'
import { Select } from "@/src/components/ui/select"
import { getProductCategories } from "@/src/utils/get-product-categories"


interface HandleSearchFunction extends SubmitHandler<ProductSearchSchemaType> { }

export function ProductSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { register, control, handleSubmit, watch, reset, formState: { isSubmitting, errors } } = useForm<ProductSearchSchemaType>({
    defaultValues: {
      category: '',
      name: ''
    },
    resolver: zodResolver(productSearchSchema)
  })

  const handleSearch: HandleSearchFunction = (data) => {
    const searchParams = new URLSearchParams()

    for (const key in data) {
      const value = data[key as keyof ProductSearchSchemaType]
      if (value) searchParams.set(key, value)
    }

    router.push(`${pathname}?${searchParams.toString()}`)
  }

  const handleReset = () => {
    reset()
    router.push(pathname)
  }

  const category = watch('category')
  const name = watch('name')
  const categories = getProductCategories()

  const isThereSearchParams = !!searchParams.get('name') || !!searchParams.get('category')
  const isSearching = !!category || !!name || isThereSearchParams
  const isButtonDisabled = isSubmitting || (!category && !name)

  return (
    <div className="flex flex-col gap-2 items-start w-full">

      <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2 items-center justify-center w-full max-w-[800px]">
        <Input id='name' aria-label='product name' placeholder="Product name" {...register('name')} />

        <Controller
          control={control}
          name='category'
          render={({ field: { onChange, value } }) => (
            <Select.Root onValueChange={onChange} value={value} placeholder="Select a category">
              {categories.map(category => (
                <Select.Item key={category} value={category}>{category}</Select.Item>
              ))}
            </Select.Root>
          )}
        />

        <Button type='submit' aria-label='search for a product' disabled={isButtonDisabled}>Search</Button>
        {isSearching ?
          <Button type="button" aria-label='reset' variant="reset" onClick={handleReset}>reset</Button>
          : <></>}
      </form>
      {errors?.name?.message ? <p className="text-red-500 font-semibold text-sm">{errors?.name?.message}</p> : <></>}
    </div>
  )
}