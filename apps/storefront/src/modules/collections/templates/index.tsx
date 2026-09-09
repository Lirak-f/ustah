import { Suspense } from "react"

import { listProducts } from "@lib/data/products"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { buildFilterGroups } from "@lib/util/ustah-filters"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import UstahFilters from "@modules/store/components/ustah-filters"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default async function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const { response: all } = await listProducts({
    countryCode,
    queryParams: { collection_id: [collection.id], limit: 100 },
  }).catch(() => ({ response: { products: [], count: 0 } }))
  const filterGroups = buildFilterGroups(all.products)

  return (
    <div className="mx-auto max-w-[1440px] border border-border-strong bg-bg">
      <nav
        aria-label="Shtegu"
        className="flex flex-wrap items-center gap-2 border-b border-divider px-6 py-4 text-[12px] text-muted"
      >
        <LocalizedClientLink href="/" className="hover:text-accent">
          Kryefaqja
        </LocalizedClientLink>
        <span aria-hidden>/</span>
        <span className="text-text">{collection.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-start">
        <UstahFilters groups={filterGroups} />

        <div className="min-w-0 flex-1 border-divider lg:border-l">
          <div className="border-b border-divider px-6 py-6">
            <h1 className="text-page-title uppercase">{collection.title}</h1>
          </div>
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
