import { cn } from "@lib/util/cn"
import { formatEur, formatExVat, productMeta } from "@lib/util/ustah-price"

type PriceProps = {
  /** Price actually charged, in EUR. */
  amount: number
  /** Original price, when genuinely discounted. Struck through. */
  compareAt?: number | null
  /** Formatted badge text from `discountPercent`, e.g. `−18%`. */
  discount?: string | null
  /**
   * `sm` rail card, `md` listing card, `lg` product page buy box. Maps onto the
   * --text-price / --text-price-lg tokens rather than arbitrary sizes; the rail
   * card used to hardcode 26px against a 30px token.
   */
  size?: "sm" | "md" | "lg"
  /** Trade buyers compare ex-VAT; the listing and buy box show it, cards do not. */
  showExVat?: boolean
  className?: string
}

const priceText = {
  sm: "text-[26px]",
  md: "text-price",
  lg: "text-price-lg",
} as const

/**
 * The price block, as the design specifies it: the figure is the loudest
 * element on a card, and a discounted price sits on a yellow block with the
 * struck original beneath.
 *
 * Three components rendered this independently and had drifted on the padding,
 * the type scale and whether the ex-VAT figure appeared at all.
 */
const Price = ({
  amount,
  compareAt,
  discount,
  size = "md",
  showExVat = false,
  className,
}: PriceProps) => {
  const hasCompareAt = !!compareAt && !!discount

  return (
    <div className={className}>
      {/* Padding only exists to inset the figure from the yellow ground, so it
        is tied to the block rather than applied unconditionally — otherwise an
        undiscounted price sits 12px off the card's text column. */}
      <div
        className={cn("inline-block", discount && "bg-yellow px-3 py-[2px]")}
      >
        <span className={cn("font-heading font-bold", priceText[size])}>
          {formatEur(amount)}
        </span>
      </div>
      {/* This row is often empty, so it renders only when
        it actually carries something — an unconditional div would add 2px of
        margin under every undiscounted card price. */}
      {(hasCompareAt || showExVat) && (
        <div className="mt-[2px] text-[11px] text-muted-deep">
          {hasCompareAt ? <s>{formatEur(compareAt)}</s> : null}
          {hasCompareAt && showExVat ? " · " : null}
          {showExVat ? `pa TVSH ${formatExVat(amount)}` : null}
        </div>
      )}
    </div>
  )
}

export default Price

/** Re-exported so a card does not need a second import to read compare-at. */
export { productMeta }
