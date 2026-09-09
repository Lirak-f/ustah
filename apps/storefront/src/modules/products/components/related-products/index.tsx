import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import UstahProductCard from "@modules/products/components/ustah-product-card"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

/**
 * Related products.
 *
 * Matched by category rather than collection: only the offers and bestsellers
 * products carry a collection, so a collection-only match rendered nothing for
 * most of the catalog. Category is what makes two hardware items genuinely
 * comparable anyway.
 */
export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const categoryIds = (product.categories ?? [])
    .map((c) => c.id)
    .filter(Boolean) as string[]

  if (!categoryIds.length) {
    return null
  }

  const products = await listProducts({
    countryCode,
    queryParams: {
      region_id: region.id,
      category_id: categoryIds,
      is_giftcard: false,
      limit: 5,
    },
  })
    .then(({ response }) =>
      response.products.filter((p) => p.id !== product.id).slice(0, 4),
    )
    .catch(() => [])

  if (!products.length) {
    return null
  }

  return (
    <section className="bg-bg">
      <h2 className="px-6 pt-7 text-[26px] uppercase">Produkte të ngjashme</h2>
      <div className="mx-6 mt-5 mb-7 grid grid-cols-2 gap-px border border-divider bg-divider lg:grid-cols-4">
        {products.map((related) => (
          <UstahProductCard key={related.id} product={related} />
        ))}
      </div>
    </section>
  )
}
