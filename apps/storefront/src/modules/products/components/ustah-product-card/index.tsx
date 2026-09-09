import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { getProductPrice } from "@lib/util/get-product-price"
import {
  discountPercent,
  formatEur,
  formatLek,
  productMeta,
} from "@lib/util/ustah-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  product: HttpTypes.StoreProduct
}

/**
 * Product card, shared by the homepage rail and the listing grid.
 *
 * Price is the loudest element: on a discounted product the design puts it on a
 * yellow block with the struck original and lek conversion beneath. Cards sit
 * on a 1px divider-coloured grid, so the card itself carries no border — the
 * gap between white cards *is* the rule.
 */
const UstahProductCard = ({ product }: Props) => {
  const { cheapestPrice } = getProductPrice({ product })
  const { brand, compareAt } = productMeta(product.metadata)

  const amount = cheapestPrice?.calculated_price_number ?? null
  const discount =
    amount !== null ? discountPercent(amount, compareAt ?? undefined) : null
  const sku = product.variants?.[0]?.sku ?? null

  return (
    <article className="group bg-bg p-5">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="block"
      >
        <div className="relative mb-4 h-[150px] bg-surface">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, 20vw"
              className="object-contain p-3"
            />
          ) : (
            /* Placeholder matches the design's hatched "foto produkti" band. */
            <div
              className="grid h-full place-items-center bg-[repeating-linear-gradient(135deg,var(--color-surface)_0_7px,var(--color-bg)_7px_14px)]"
              aria-hidden
            >
              <span className="font-mono text-[10px] text-faint">
                foto produkti
              </span>
            </div>
          )}

          {discount && (
            <span className="absolute left-0 top-0 bg-yellow px-3 py-2 font-body text-[12px] font-bold leading-none text-text">
              {discount}
            </span>
          )}
        </div>

        {(brand || sku) && (
          <div className="mb-1 font-mono text-[10px] leading-none text-muted">
            {[brand, sku].filter(Boolean).join(" · ")}
          </div>
        )}

        <h3 className="font-heading text-[16px] font-semibold leading-[1.1] group-hover:text-accent">
          {product.title}
        </h3>

        {product.subtitle && (
          <p className="mt-[2px] text-[12px] text-muted">{product.subtitle}</p>
        )}

        {amount !== null && (
          <>
            <div
              className={`mt-4 inline-block px-3 py-[2px] ${discount ? "bg-yellow" : ""}`}
            >
              <span className="font-heading text-[26px] font-bold leading-none">
                {formatEur(amount)}
              </span>
            </div>
            <div className="mt-[2px] text-[11px] text-muted-deep">
              {compareAt && discount ? (
                <>
                  <s>{formatEur(compareAt)}</s> ·{" "}
                </>
              ) : null}
              ≈ {formatLek(amount)}
            </div>
          </>
        )}
      </LocalizedClientLink>
    </article>
  )
}

export default UstahProductCard
