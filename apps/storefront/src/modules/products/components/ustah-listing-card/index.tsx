import { HttpTypes } from "@medusajs/types"

import { productMeta } from "@lib/util/ustah-price"
import { getStockState } from "@lib/util/ustah-stock"
import { selectLeadVariant } from "@lib/util/ustah-variant"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  Price,
  ProductMedia,
  SkuLine,
  StockLine,
} from "@modules/common/components/ustah"
import UstahAddToCartButton from "@modules/products/components/ustah-add-to-cart-button"

type Props = {
  product: HttpTypes.StoreProduct
}

/** Delivery promise shown under the stock line. */
const DELIVERY_ESTIMATE = "Prishtinë 1–2 ditë · Tiranë 2–3 ditë"

/**
 * Catalog listing card.
 *
 * Denser than the rail card: it adds a spec table, the ex-VAT price for trade
 * buyers, a stock state and a delivery estimate — the four things a builder
 * compares across a results page before opening anything.
 */
const UstahListingCard = ({ product }: Props) => {
  const { brand } = productMeta(product.metadata)
  const lead = selectLeadVariant(product)
  const stock = getStockState(lead?.variant)

  // The variant's own option values are the spec rows: for this catalog they
  // are the real differentiators (voltage, diameter, pack size).
  const specs = (lead?.variant.options ?? [])
    .map((o) => ({ key: o.option?.title ?? null, value: o.value }))
    .filter((s): s is { key: string; value: string } => !!s.key && !!s.value)

  return (
    <article className="flex flex-col bg-bg p-5">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="flex flex-1 flex-col"
      >
        <ProductMedia
          src={product.thumbnail}
          alt={product.title}
          sizes="(max-width: 1024px) 50vw, 25vw"
          height="listing"
          discount={lead?.discount}
          className="mb-4"
        />

        <SkuLine brand={brand} sku={lead?.sku} className="mb-1" />

        <h3 className="mb-3 font-heading text-card-title font-semibold hover:text-accent">
          {product.title}
        </h3>

        {specs.length > 0 && (
          <dl className="mb-4 text-[12px]">
            {specs.map((spec) => (
              <div key={spec.key} className="flex justify-between py-[3px]">
                <dt className="text-muted">{spec.key}</dt>
                <dd className="font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {lead && (
          <div className="mt-auto">
            <Price
              amount={lead.amount}
              compareAt={lead.compareAt}
              discount={lead.discount}
              size="md"
              showExVat
            />
            <StockLine stock={stock} className="mt-4" />
            <div className="mt-[2px] text-[11px] text-muted-deep">
              {DELIVERY_ESTIMATE}
            </div>
          </div>
        )}
      </LocalizedClientLink>

      {/* Outside the link on purpose: a button nested in an anchor is invalid
          markup, and the click would navigate as well as add. */}
      {lead && <UstahAddToCartButton product={product} className="mt-5" />}
    </article>
  )
}

export default UstahListingCard
