import { commerce } from "@ustah/design-tokens"

/**
 * Price formatting for the Ustah storefront.
 *
 * The design writes money as `219,00 €` — comma decimal, thin space before the
 * symbol, dot thousands separator. That is sq-AL convention, not the starter's
 * en-US default (`€219.00`), so these helpers are used instead of
 * `convertToLocale` anywhere a price is shown in Ustah chrome.
 */

const eur = new Intl.NumberFormat("sq-AL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const lek = new Intl.NumberFormat("sq-AL", {
  maximumFractionDigits: 0,
})

/** `219,00 €` */
export const formatEur = (amount: number) => `${eur.format(amount)} €`

/**
 * Courtesy conversion shown under the price. Display-only: EUR is the sole
 * transacted currency and the design fixes the rate at 100 L = 1 €.
 */
export const formatLek = (amountEur: number) =>
  `${lek.format(Math.round(amountEur * commerce.lekPerEur))} L`

/** Ex-VAT figure for trade buyers, derived from the VAT-inclusive catalog price. */
export const formatExVat = (amountEur: number) =>
  formatEur(amountEur / (1 + commerce.vatRate))

/**
 * Discount percentage as the design renders it: a negative integer with the
 * Unicode minus, e.g. `−18%`. Returns null when there is no real discount, so
 * the badge is simply not rendered.
 */
export const discountPercent = (price: number, compareAt?: number) => {
  if (!compareAt || compareAt <= price || price <= 0) {
    return null
  }
  const pct = Math.round(((compareAt - price) / compareAt) * 100)
  // A card prices the cheapest variant, so a compare_at authored against a
  // different (larger) variant would render an absurd discount. Anything past
  // 60% is treated as bad data and the badge is dropped rather than shown.
  return pct > 0 && pct <= 60 ? `−${pct}%` : null
}

/** Reads the seeded `metadata.brand` / `metadata.compare_at` off a product. */
export const productMeta = (metadata?: Record<string, unknown> | null) => {
  const brand = typeof metadata?.brand === "string" ? metadata.brand : null
  const raw = metadata?.compare_at
  const compareAt =
    typeof raw === "number"
      ? raw
      : typeof raw === "string" && raw.trim() !== "" && !isNaN(Number(raw))
        ? Number(raw)
        : null
  return { brand, compareAt }
}
