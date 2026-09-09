import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The design's `--text-*` scale, keyed by role rather than by size.
 *
 * tailwind-merge has to be told about these explicitly. Out of the box it
 * assumes any unrecognised `text-*` class is a colour, so
 * `text-sku text-muted` silently collapsed to `text-muted` and dropped the
 * font size — the SKU line rendered at the inherited body size. Listing them
 * here lets it classify `text-sku` as a font-size, which does NOT conflict with
 * `text-muted`, while `text-sku text-price` correctly resolves to the last one.
 */
const fontSize = [
  "logo",
  "price",
  "price-lg",
  "card-title",
  "page-title",
  "nav",
  "section-label",
  "body",
  "small",
  "xs",
  "sku",
]

/** The design's colour tokens, for the same reason in the other direction. */
const textColor = [
  "accent",
  "accent-100",
  "accent-200",
  "accent-300",
  "accent-400",
  "accent-500",
  "accent-600",
  "accent-700",
  "accent-800",
  "accent-900",
  "yellow",
  "yellow-600",
  "yellow-700",
  "bg",
  "page",
  "surface",
  "surface-alt",
  "text",
  "muted",
  "muted-deep",
  "faint",
  "divider",
  "border-strong",
  "border-soft",
  "danger",
]

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSize }],
      "text-color": [{ text: textColor }],
    },
  },
})

/**
 * Joins class names and resolves Tailwind conflicts, last one winning.
 *
 * Plain `clsx` concatenates, so `clsx("p-4", "p-6")` emits both and which one
 * applies depends on their order in the generated stylesheet rather than on the
 * caller's intent. That matters most for the `className` prop: a component with
 * a default of `bg-accent` could not be overridden to `bg-yellow` reliably.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
