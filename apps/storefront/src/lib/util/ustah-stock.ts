import { HttpTypes } from "@medusajs/types"

/**
 * Stock state for the catalog's availability line.
 *
 * The design distinguishes three states, each with its own colour: in stock
 * (accent square + "Në stok · N copë"), low stock (danger, "Vetëm N copë në
 * stok") and out of stock. Low stock is a genuine signal in a trade catalog —
 * a builder needs to know a run will not cover the job — so the threshold is
 * explicit rather than implied by a count.
 */

/** At or below this quantity the design switches to the danger treatment. */
export const LOW_STOCK_THRESHOLD = 5

export type StockState = {
  level: "in" | "low" | "out"
  label: string
}

type StockVariant = Pick<
  HttpTypes.StoreProductVariant,
  "manage_inventory" | "allow_backorder" | "inventory_quantity"
>

export const getStockState = (variant?: StockVariant | null): StockState => {
  if (!variant) {
    return { level: "out", label: "Nuk ka në stok" }
  }

  // An unmanaged or backorderable variant is always orderable, so no count is
  // shown — a number would imply a precision the data does not carry.
  if (!variant.manage_inventory || variant.allow_backorder) {
    return { level: "in", label: "Në stok" }
  }

  const qty = variant.inventory_quantity ?? 0

  if (qty <= 0) {
    return { level: "out", label: "Nuk ka në stok" }
  }

  if (qty <= LOW_STOCK_THRESHOLD) {
    return { level: "low", label: `Vetëm ${qty} copë në stok` }
  }

  // The design caps the displayed figure rather than printing a warehouse
  // number: "40+ copë", "100+ copë".
  const rounded = qty >= 100 ? "100+" : qty >= 40 ? "40+" : `${qty}`
  return { level: "in", label: `Në stok · ${rounded} copë` }
}
