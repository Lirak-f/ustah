import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import UstahProductCard from "@modules/products/components/ustah-product-card"

type Props = {
  title: string
  products: HttpTypes.StoreProduct[]
  viewAllHref: string
  viewAllLabel: string
}

/**
 * A titled row of product cards. The 1px gaps over a divider-coloured ground
 * are what draw the rules between cards, matching the catalog grid.
 */
const ProductRail = ({ title, products, viewAllHref, viewAllLabel }: Props) => {
  if (!products.length) {
    return null
  }

  return (
    <section className="bg-bg">
      <div className="flex items-baseline justify-between px-7 pt-7">
        <h2 className="text-[26px] uppercase">{title}</h2>
        <LocalizedClientLink
          href={viewAllHref}
          className="text-[13px] text-accent hover:underline"
        >
          {viewAllLabel}
        </LocalizedClientLink>
      </div>

      <div className="mx-7 mb-7 mt-5 grid grid-cols-2 gap-px border border-divider bg-divider sm:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <UstahProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductRail
