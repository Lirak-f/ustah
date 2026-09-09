import { Suspense } from "react"

import { listProducts } from "@lib/data/products"
import { buildFilterGroups } from "@lib/util/ustah-filters"
import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import UstahFilters from "@modules/store/components/ustah-filters"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
  searchQuery,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  searchQuery?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const { response: all } = await listProducts({
    countryCode,
    queryParams: { limit: 100, ...(searchQuery ? { q: searchQuery } : {}) },
  }).catch(() => ({ response: { products: [], count: 0 } }))
  const filterGroups = buildFilterGroups(all.products)

  return (
    <div
      className="mx-auto max-w-[1440px] border border-border-strong bg-bg"
      data-testid="category-container"
    >
      <div className="flex flex-col lg:flex-row lg:items-start">
        <UstahFilters groups={filterGroups} />

        <div className="min-w-0 flex-1 border-divider lg:border-l">
          <div className="border-b border-divider p-6">
            <h1
              className="text-page-title uppercase"
              data-testid="store-page-title"
            >
              {searchQuery
                ? `Rezultatet për "${searchQuery}"`
                : "Të gjitha produktet"}
            </h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
              searchQuery={searchQuery}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
