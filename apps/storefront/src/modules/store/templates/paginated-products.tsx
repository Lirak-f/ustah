import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import UstahListingCard from "@modules/products/components/ustah-listing-card"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import UstahSortBar from "@modules/store/components/ustah-sort-bar"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
  searchQuery,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
  searchQuery?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (searchQuery) {
    queryParams["q"] = searchQuery
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (!products.length) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="font-heading text-[20px] font-semibold uppercase">
          Asnjë produkt
        </p>
        <p className="mt-2 text-[13px] text-muted-deep">
          Provo të heqësh disa filtra ose kërko me një term tjetër.
        </p>
      </div>
    )
  }

  return (
    <>
      <UstahSortBar sortBy={sortBy ?? "created_at"} count={count} />
      <div
        className="grid grid-cols-1 gap-px border-b border-divider bg-divider sm:grid-cols-2 xl:grid-cols-4"
        data-testid="products-list"
      >
        {products.map((p) => (
          <UstahListingCard key={p.id} product={p} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="px-6 py-7">
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}
