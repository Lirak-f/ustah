/**
 * Ustah design-system primitives.
 *
 * These carry the design's own language — zero radius, accent blue for
 * structure, yellow for attention, Barlow Condensed for anything structural or
 * numeric. They are the replacement for the generic starter shim in
 * `../ui`, which styles against bg-black/rounded-md and does not match.
 */
export { buttonVariants, type ButtonVariantProps } from "./button"
export { default as Price } from "./price"
export { DiscountBadge, ProductMedia } from "./product-media"
export { SkuLine, StockLine } from "./product-meta"
