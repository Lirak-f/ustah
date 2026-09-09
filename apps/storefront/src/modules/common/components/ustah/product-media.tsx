import Image from "next/image"

import { cn } from "@lib/util/cn"

type DiscountBadgeProps = {
  /** Formatted text from `discountPercent`, e.g. `−18%`. */
  children: React.ReactNode
  className?: string
}

/**
 * The yellow discount flag, pinned to the top-left of a product image.
 *
 * Yellow is the attention accent and is never used for a non-action surface, so
 * this is the only badge that carries it.
 */
export const DiscountBadge = ({ children, className }: DiscountBadgeProps) => (
  <span
    className={cn(
      "absolute top-0 left-0 bg-yellow px-3 py-2 font-body text-[12px] leading-none font-bold text-text",
      className,
    )}
  >
    {children}
  </span>
)

type ProductMediaProps = {
  src?: string | null
  alt: string
  /** Responsive `sizes` for next/image; differs per grid density. */
  sizes: string
  /** Image band height. The design uses 150px on the rail, 170px in the grid. */
  height: "rail" | "listing"
  discount?: string | null
  className?: string
}

const bandHeight = {
  rail: "h-[150px]",
  listing: "h-[170px]",
} as const

/**
 * Product image band, with the design's hatched placeholder when a product has
 * no thumbnail.
 *
 * The hatch was inlined as an arbitrary `bg-[repeating-linear-gradient(...)]`
 * in four places, one of which hardcoded hex values. It is now the `bg-hatch`
 * utility in globals.css, defined once against the tokens.
 */
export const ProductMedia = ({
  src,
  alt,
  sizes,
  height,
  discount,
  className,
}: ProductMediaProps) => (
  <div className={cn("relative bg-surface", bandHeight[height], className)}>
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain p-3"
      />
    ) : (
      <div className="grid h-full place-items-center bg-hatch" aria-hidden>
        <span className="font-mono text-[10px] text-faint">foto produkti</span>
      </div>
    )}

    {discount && <DiscountBadge>{discount}</DiscountBadge>}
  </div>
)
