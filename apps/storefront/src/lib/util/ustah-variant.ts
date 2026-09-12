import { HttpTypes } from "@medusajs/types"

import { discountPercent, productMeta } from "./ustah-price"

/**
 * A variant carrying the calculated price the store API returns when a region
 * is in scope. `calculated_amount` is optional on the upstream type, so it is
 * narrowed here once rather than at each call site.
 */
export type PricedVariant = HttpTypes.StoreProductVariant & {
  calculated_price?: { calculated_amount?: number }
}

/**
 * The compare-at figure to strike through for a variant, or null when the
 * variant is not genuinely discounted.
 *
 * Authored per product as `metadata.compare_at`, so it is the same for every
 * shopper. The trader discount deliberately does NOT appear here: it is an
 * automatic cart promotion, applied to line items at checkout rather than to
 * catalog prices, so a trader browsing sees list prices and their 10% on the
 * cart and order summary.
 *
 * Shared by the listing cards and the buy box so both strike through the same
 * figure — they previously derived it separately.
 */
export const compareAtFor = (
  variant: HttpTypes.StoreProductVariant,
  amount: number,
): number | null => {
  const authored = productMeta(variant.metadata).compareAt

  return typeof authored === "number" && authored > amount ? authored : null
}

export type LeadVariant = {
  variant: HttpTypes.StoreProductVariant
  /** Price actually charged, in EUR. */
  amount: number
  sku: string | null
  /** Original price when this variant is genuinely discounted. */
  compareAt: number | null
  /** Formatted badge text (`−18%`), or null when there is no real discount. */
  discount: string | null
}

/**
 * Picks the variant a product listing should lead with.
 *
 * Price, SKU and compare-at must all describe the SAME variant, or a card pairs
 * one variant's price with another's code and strikes through a figure the
 * shopper is never offered. That invariant was previously enforced
 * independently in three components; it lives here so there is one place to get
 * it right.
 *
 * Which variant leads is a merchandising choice, and the design answers it: the
 * KB-SET2 card shows "2 x 5,0 Ah" at 219,00 EUR struck from 269,00 EUR — the
 * DISCOUNTED variant, not the cheapest (2 x 2,0 Ah at 179,00 EUR). A card in
 * "Ofertat e javes" that hid the offer would defeat the rail. So: prefer the
 * deepest genuine discount, and fall back to the cheapest when none is on
 * offer.
 *
 * Returns null when no variant carries a price, which is the signal to render
 * the card without a price block rather than with a zero.
 */
export const selectLeadVariant = (
  product: Pick<HttpTypes.StoreProduct, "variants">,
): LeadVariant | null => {
  const priced = ((product.variants ?? []) as PricedVariant[]).filter(
    (v) => typeof v.calculated_price?.calculated_amount === "number",
  )

  const lead = priced
    .map((variant) => {
      const amount = variant.calculated_price?.calculated_amount ?? 0
      const was = compareAtFor(variant, amount)
      return {
        variant,
        amount,
        saving: was && was > amount ? was - amount : 0,
      }
    })
    .sort((a, b) => b.saving - a.saving || a.amount - b.amount)[0]

  if (!lead) {
    return null
  }

  const compareAt = compareAtFor(lead.variant, lead.amount)

  return {
    variant: lead.variant,
    amount: lead.amount,
    sku: lead.variant.sku ?? null,
    compareAt,
    discount: discountPercent(lead.amount, compareAt ?? undefined),
  }
}
