import { HttpTypes } from "@medusajs/types"

import { productMeta } from "@lib/util/ustah-price"
import { selectLeadVariant } from "@lib/util/ustah-variant"
import { Price, ProductMedia, SkuLine } from "@modules/common/components/ustah"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  product: HttpTypes.StoreProduct
}

/**
 * Product card, shared by the homepage rail and the related-products rail.
 *
 * Cards sit on a 1px divider-coloured grid, so the card itself carries no
 * border — the gap between white cards *is* the rule.
 */
const UstahProductCard = ({ product }: Props) => {
  const { brand } = productMeta(product.metadata)
  const lead = selectLeadVariant(product)

  return (
    <article className="group bg-bg p-5">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="block"
      >
        <ProductMedia
          src={product.thumbnail}
          alt={product.title}
          sizes="(max-width: 640px) 50vw, 20vw"
          height="rail"
          discount={lead?.discount}
          className="mb-4"
        />

        <SkuLine brand={brand} sku={lead?.sku} className="mb-1" />

        <h3 className="font-heading text-card-title font-semibold group-hover:text-accent">
          {product.title}
        </h3>

        {product.subtitle && (
          <p className="mt-[2px] text-[12px] text-muted">{product.subtitle}</p>
        )}

        {lead && (
          <Price
            amount={lead.amount}
            compareAt={lead.compareAt}
            discount={lead.discount}
            size="sm"
            className="mt-4"
          />
        )}
      </LocalizedClientLink>
    </article>
  )
}

export default UstahProductCard
