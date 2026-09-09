import type { SVGProps } from "react"

/**
 * Local replacements for the `@medusajs/icons` set.
 *
 * That package resolves the workspace root's React 18 (pinned by the Medusa
 * backend for its admin) while this app runs React 19. Elements it creates
 * therefore carry React 18's shape, which React 19 refuses to render:
 *
 *   Objects are not valid as a React child
 *   (found: object with keys {$$typeof, type, key, ref, props, _owner})
 *
 * The dev server tolerates it, but `next build` dies prerendering /404. npm
 * overrides cannot fix the resolution while the two apps need different React
 * majors, so the icons are drawn locally instead. Same export names as the
 * upstream package, so imports only need their path changed.
 *
 * Delete this module once both apps share a React major.
 */

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  width: "20",
  height: "20",
}

const solid = {
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
  width: "20",
  height: "20",
}

export const ArrowRightMini = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M7.5 5l5 5-5 5" />
  </svg>
)

export const ArrowUpRightMini = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M6.5 13.5l7-7M7 6.5h6.5V13" />
  </svg>
)

export const ArrowRightOnRectangle = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M12 3.5h3.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H12" />
    <path d="M9 13.5l3.5-3.5L9 6.5M12.5 10h-9" />
  </svg>
)

export const ChevronDownMini = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M5 7.5l5 5 5-5" />
  </svg>
)

export const ChevronUpDown = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M6 8l4-4 4 4M6 12l4 4 4-4" />
  </svg>
)

export const XMark = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
)

export const Plus = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M10 4v12M4 10h12" />
  </svg>
)

export const Trash = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M3.5 5.5h13M8 5.5V4h4v1.5" />
    <path d="M5 5.5l.7 10a1 1 0 0 0 1 .9h6.6a1 1 0 0 0 1-.9l.7-10" />
    <path d="M8.5 8.5v5M11.5 8.5v5" />
  </svg>
)

export const PencilSquare = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M9 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4" />
    <path d="M13.5 3.5l3 3L10 13H7v-3z" />
  </svg>
)

export const CreditCard = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <rect x="2.5" y="5" width="15" height="10" rx="1" />
    <path d="M2.5 8.5h15" />
  </svg>
)

export const EllipseMiniSolid = (p: IconProps) => (
  <svg {...solid} {...p}>
    <circle cx="10" cy="10" r="4" />
  </svg>
)

export const CheckCircleSolid = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.7 6.2a.8.8 0 0 0-1.2-1L9 10.8 7.5 9.3a.8.8 0 1 0-1.1 1.1l2 2c.3.3.8.3 1.1 0l4.2-4.2z"
    />
  </svg>
)

/** Upstream exports both; they render identically at these sizes. */
export const CheckCircleMiniSolid = CheckCircleSolid

export const XCircleSolid = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM7.8 6.7a.8.8 0 1 0-1.1 1.1L8.9 10l-2.2 2.2a.8.8 0 1 0 1.1 1.1L10 11.1l2.2 2.2a.8.8 0 0 0 1.1-1.1L11.1 10l2.2-2.2a.8.8 0 0 0-1.1-1.1L10 8.9 7.8 6.7z"
    />
  </svg>
)

export const ExclamationCircleSolid = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm.8 4.2a.8.8 0 0 0-1.6 0v4.3a.8.8 0 0 0 1.6 0V6.2zM10 13.9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
)

export const Spinner = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M10 2.5a7.5 7.5 0 1 0 7.5 7.5" />
  </svg>
)

/** Upstream `Loader` is the same mark; callers add their own spin animation. */
export const Loader = Spinner

export const Github = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M10 1.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1.1-2.9-1.1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.3 2 .9 2.5.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.2-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8.5 8.5 0 0 0 10 1.5z" />
  </svg>
)
