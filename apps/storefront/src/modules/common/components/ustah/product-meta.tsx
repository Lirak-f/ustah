import { cn } from "@lib/util/cn"
import type { StockState } from "@lib/util/ustah-stock"

type SkuLineProps = {
  brand?: string | null
  sku?: string | null
  className?: string
}

/**
 * The `brand · SKU` line above a product title.
 *
 * Mono, because a SKU is a machine identifier the shopper reads character by
 * character when matching a part. Uses the `text-sku` token (11px); the two
 * cards previously hardcoded 10px and 11px respectively.
 */
export const SkuLine = ({ brand, sku, className }: SkuLineProps) => {
  const parts = [brand, sku].filter(Boolean)

  if (!parts.length) {
    return null
  }

  return (
    <div
      className={cn("font-mono text-sku leading-none text-muted", className)}
    >
      {parts.join(" · ")}
    </div>
  )
}

type StockLineProps = {
  stock: StockState
  className?: string
}

const dotColor = {
  in: "bg-accent",
  low: "bg-danger",
  out: "bg-border-strong",
} as const

/**
 * Availability line: a square status dot plus its label.
 *
 * Square, not round — the zero-radius rule holds here, and the dot reads as a
 * status marker rather than a bullet. Low stock is the only state that recolours
 * the label, since it is the one the shopper must act on.
 */
export const StockLine = ({ stock, className }: StockLineProps) => (
  <div className={cn("flex items-center gap-2 text-[12px]", className)}>
    <i aria-hidden className={cn("block size-2", dotColor[stock.level])} />
    <span className={stock.level === "low" ? "text-danger" : undefined}>
      {stock.label}
    </span>
  </div>
)
