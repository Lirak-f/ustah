import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import {
  discountPercent,
  formatEur,
  formatExVat,
  formatLek,
  productMeta,
} from "@lib/util/ustah-price"
import { getStockState } from "@lib/util/ustah-stock"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type PricedVariant = HttpTypes.StoreProductVariant & {
  calculated_price?: { calculated_amount: number }
}

type Props = {
  product: HttpTypes.StoreProduct
}

/**
 * Catalog listing card.
 *
 * Denser than the homepage rail card: it adds a spec table, the ex-VAT price
 * for trade buyers, a stock state and a delivery estimate — the four things a
 * builder compares across a results page before opening anything.
 */
const UstahListingCard = ({ product }: Props) => {
  const { brand } = productMeta(product.metadata)

  const priced = ((product.variants ?? []) as PricedVariant[]).filter(
    (v) => typeof v.calculated_price?.calculated_amount === "number",
  )

  // Same rule as the rail card: lead with the discounted variant when there is
  // a genuine offer, otherwise the cheapest.
  const leadVariant =
    priced
      .map((v) => {
        const price = v.calculated_price?.calculated_amount ?? 0
        const was = productMeta(v.metadata).compareAt
        return { v, price, saving: was && was > price ? was - price : 0 }
      })
      .sort((a, b) => b.saving - a.saving || a.price - b.price)[0]?.v ?? null

  const amount = leadVariant?.calculated_price?.calculated_amount ?? null
  const { compareAt } = productMeta(leadVariant?.metadata)
  const discount =
    amount !== null ? discountPercent(amount, compareAt ?? undefined) : null
  const stock = getStockState(leadVariant)

  // The variant's own option values are the spec rows: for this catalog they
  // are the real differentiators (voltage, diameter, pack size).
  const specs = (leadVariant?.options ?? [])
    .map((o) => ({
      key: o.option?.title ?? null,
      value: o.value,
    }))
    .filter((s): s is { key: string; value: string } => !!s.key && !!s.value)

  return (
    <article className="flex flex-col bg-bg p-5">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="flex flex-1 flex-col"
      >
        <div className="relative mb-4 h-[170px] bg-surface">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-contain p-3"
            />
          ) : (
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

        {(brand || leadVariant?.sku) && (
          <div className="mb-1 font-mono text-[11px] leading-none text-muted">
            {[brand, leadVariant?.sku].filter(Boolean).join(" · ")}
          </div>
        )}

        <h3 className="mb-3 font-heading text-[17px] font-semibold leading-[1.1] hover:text-accent">
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

        {amount !== null && (
          <div className="mt-auto">
            <div
              className={discount ? "inline-block bg-yellow px-3 py-[2px]" : ""}
            >
              <span className="font-heading text-price font-bold">
                {formatEur(amount)}
              </span>
            </div>
            <div className="mt-[2px] text-[11px] text-muted-deep">
              {compareAt && discount ? (
                <>
                  <s>{formatEur(compareAt)}</s> ·{" "}
                </>
              ) : null}
              ≈ {formatLek(amount)} · pa TVSH {formatExVat(amount)}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px]">
              <i
                aria-hidden
                className={`block size-2 ${
                  stock.level === "in"
                    ? "bg-accent"
                    : stock.level === "low"
                      ? "bg-danger"
                      : "bg-border-strong"
                }`}
              />
              <span
                className={stock.level === "low" ? "text-danger" : undefined}
              >
                {stock.label}
              </span>
            </div>
            <div className="mt-[2px] text-[11px] text-muted-deep">
              Prishtinë 1–2 ditë · Tiranë 2–3 ditë
            </div>
          </div>
        )}
      </LocalizedClientLink>
    </article>
  )
}

export default UstahListingCard
