import type { SVGProps } from "react"

/**
 * Ustah icon set.
 *
 * The design bundle references its icons through `-webkit-mask: url(<uuid>)`
 * pointing at assets inside the bundle, which cannot be extracted as files.
 * These are redrawn as inline SVG on the same 24-unit grid, stroked rather than
 * filled so they inherit `currentColor` and stay crisp at the 19-34px sizes the
 * design uses.
 */

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
}

export const IconMenu = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

export const IconSearch = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconUser = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="3.75" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
)

export const IconCart = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M2.5 3h2.6l2.2 11.2a1.8 1.8 0 0 0 1.8 1.4h8.3a1.8 1.8 0 0 0 1.8-1.4L21 7H6" />
    <circle cx="9.5" cy="20" r="1.4" />
    <circle cx="17.5" cy="20" r="1.4" />
  </svg>
)

/** Trust bar: cash on delivery. */
export const IconCash = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="6" width="19" height="12" rx="1" />
    <circle cx="12" cy="12" r="2.75" />
    <path d="M6 9.5v5M18 9.5v5" />
  </svg>
)

/** Trust bar: delivery time. */
export const IconTruck = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M2.5 16V5.5h11V16" />
    <path d="M13.5 9h4l3 3.2V16" />
    <circle cx="7" cy="17.5" r="1.7" />
    <circle cx="17.5" cy="17.5" r="1.7" />
  </svg>
)

/** Trust bar: free delivery threshold. */
export const IconBox = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M21 8.5 12 4 3 8.5v7L12 20l9-4.5z" />
    <path d="M3 8.5 12 13l9-4.5M12 13v7" />
  </svg>
)

/** Trust bar: VAT invoice for businesses. */
export const IconInvoice = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5.5 3h13v18l-2.2-1.6-2.2 1.6-2.1-1.6L9.8 21l-2.1-1.6L5.5 21z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
)

/** Category tiles — one per top-level category, in the design's nav order. */
export const IconPowerTool = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 9.5h8.5V15H3z" />
    <path d="M11.5 11h4l4-3v8l-4-3h-4" />
    <path d="M5.5 15v4.5h4V15" />
  </svg>
)

export const IconPlumbing = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 7.5h6.5v9H3z" />
    <path d="M9.5 12H15" />
    <path d="M15 5.5h6v13h-6z" />
    <path d="M18 2.5v3M18 18.5v3" />
  </svg>
)

export const IconHeating = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 6v12M9.5 6v12M14 6v12M18.5 6v12" />
    <path d="M3 8.5h18M3 15.5h18" />
  </svg>
)

export const IconElectrical = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M13.5 2.5 5 13.5h6L10.5 21.5 19 10.5h-6z" />
  </svg>
)

export const IconFasteners = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9 2.5h6l-1 4h-4z" />
    <path d="M10 6.5h4l-.6 12L12 21.5l-1.4-3z" />
    <path d="M10.2 10h3.6M10.1 13h3.8" />
  </svg>
)

export const IconCement = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3.5 9 12 5l8.5 4-8.5 4z" />
    <path d="M3.5 9v6l8.5 4 8.5-4V9" />
    <path d="M12 13v6" />
  </svg>
)

export const IconPaint = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4.5 3.5h11v6h-11z" />
    <path d="M15.5 6.5H19V12h-7v2.5" />
    <rect x="10" y="14.5" width="4" height="6" rx="0.5" />
  </svg>
)

export const IconSafety = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M2.5 13h19v3.5h-19z" />
    <path d="M12 5v2.5" />
  </svg>
)
