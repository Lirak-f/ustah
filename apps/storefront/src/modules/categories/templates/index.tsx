import { notFound } from "next/navigation"
import { Suspense } from "react"

import { listProducts } from "@lib/data/products"
import { buildFilterGroups } from "@lib/util/ustah-filters"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import UstahFilters from "@modules/store/components/ustah-filters"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]
  const collectParents = (c: HttpTypes.StoreProductCategory) => {
    if (c.parent_category) {
      parents.unshift(c.parent_category)
      collectParents(c.parent_category)
    }
  }
  collectParents(category)

  // The sidebar must offer every axis in the category, not just the axes on the
  // current page, so this reads the category's products rather than reusing the
  // paginated result.
  const { response: all } = await listProducts({
    countryCode,
    queryParams: { category_id: [category.id], limit: 100 },
  }).catch(() => ({ response: { products: [], count: 0 } }))
  const filterGroups = buildFilterGroups(all.products)

  return (
    <div
      className="mx-auto max-w-[1440px] border border-border-strong bg-bg"
      data-testid="category-container"
    >
      {/* Breadcrumb */}
      <nav
        aria-label="Shtegu"
        className="flex flex-wrap items-center gap-2 border-b border-divider px-6 py-4 text-[12px] text-muted"
      >
        <LocalizedClientLink href="/" className="hover:text-accent">
          Kryefaqja
        </LocalizedClientLink>
        {parents.map((parent) => (
          <span key={parent.id} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            <LocalizedClientLink
              href={`/categories/${parent.handle}`}
              className="hover:text-accent"
              data-testid="sort-by-link"
            >
              {parent.name}
            </LocalizedClientLink>
          </span>
        ))}
        <span aria-hidden>/</span>
        <span className="text-text">{category.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-start">
        <UstahFilters groups={filterGroups} />

        <div className="min-w-0 flex-1 border-divider lg:border-l">
          <div className="border-b border-divider p-6">
            <h1
              className="text-page-title uppercase"
              data-testid="category-page-title"
            >
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-2 max-w-[70ch] text-[13px] text-muted-deep">
                {category.description}
              </p>
            )}
            {category.category_children &&
              category.category_children.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.category_children.map((child) => (
                    <li key={child.id}>
                      <LocalizedClientLink
                        href={`/categories/${child.handle}`}
                        className="block border border-border-strong px-4 py-2 text-[12px] hover:border-accent hover:text-accent"
                      >
                        {child.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              )}
          </div>

          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
