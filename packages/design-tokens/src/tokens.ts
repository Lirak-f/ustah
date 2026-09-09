/**
 * Ustah design tokens — SOURCE OF TRUTH.
 *
 * Extracted from design/ustah-storefront.html (the Ustah override block, which is
 * the third <style> block in the bundle and wins over the generic design-system
 * defaults preceding it).
 *
 * Nothing in the app may hardcode a hex value. Components consume these via the
 * generated Tailwind @theme (see theme.css) — the ESLint `no-hex-colors` rule
 * fails the build on any hex literal in a .tsx file.
 */

/**
 * Palette.
 *
 * Two accents, not one: Ustah blue carries structure and interaction, yellow
 * carries attention (search action, discounts, offers). The design never uses
 * yellow for a non-action surface, and never uses blue for a discount badge.
 */
export const colors = {
  /** Ustah blue. Header, primary buttons, links, in-stock indicator. */
  accent: {
    DEFAULT: "#0071B9",
    100: "#E6F2FA",
    200: "#CCE5F5",
    300: "#99CAEA",
    400: "#4D9DD4",
    500: "#0071B9",
    /** Hover/pressed primary; search-bar button; cart chip ground. */
    600: "#005A94",
    /** Top utility strip; category nav row. */
    700: "#004675",
    /** Tag text on accent-100. */
    800: "#003357",
    900: "#00223B",
  },

  /**
   * Accent #2 — attention only. Search submit, discount badges, the highlighted
   * price block on a discounted card, "Ofertat e javës" nav link.
   */
  yellow: {
    DEFAULT: "#FFCC00",
    /** Hover on yellow surfaces. */
    600: "#F0C000",
    /** Muted yellow, used once in the design for a secondary badge. */
    700: "#E6B800",
  },

  /** Page and card surfaces. */
  bg: "#FFFFFF",
  /** Body ground behind the 1440px content frame. */
  page: "#DDE1E6",
  /** Filter sidebar, spec-table zebra rows, image placeholder ground. */
  surface: "#F4F5F7",
  /** A half-step above surface; used for alternating spec rows. */
  surfaceAlt: "#EDEFF2",

  /** Primary text. */
  text: "#1A1A1A",
  /** Spec keys, filter labels, secondary meta. */
  muted: "#4A5058",
  /** Sub-price line ("≈ 12.900 L · pa TVSH 107,50 €"). Slightly darker than
   *  `muted`; the design uses both, a few points apart, on adjacent lines. */
  mutedDeep: "#3F464E",
  /** Placeholder / disabled text. */
  faint: "#6B7280",

  /**
   * The hairline that defines the whole catalog. Also used as the *background*
   * of the product grid so 1px gaps read as rules between white cards.
   */
  divider: "#E1E4E8",
  /** Heavier border: outer frame, filter chips. */
  borderStrong: "#C9CDD3",
  /** A step between divider and borderStrong. */
  borderSoft: "#DDE0E4",

  /** Low stock, errors. Used sparingly — 4 occurrences in the entire design. */
  danger: "#C8102E",
} as const

/**
 * Typography.
 *
 * Barlow Condensed for anything structural or numeric (logo, titles, prices,
 * nav); Barlow for prose; mono for machine identifiers (SKU, EAN).
 *
 * Both families are self-hosted from design/extracted/fonts and include the
 * latin-ext subset — without it Albanian ë and ç fall back and break the line.
 */
export const fonts = {
  heading: "'Barlow Condensed', system-ui, sans-serif",
  body: "'Barlow', system-ui, sans-serif",
  mono: "ui-monospace, Menlo, monospace",
} as const

/**
 * Type scale, keyed by the role it plays in the design rather than by size, so
 * a component asks for `price` rather than remembering that prices are 30px.
 */
export const type = {
  /** Wordmark. 34px/0.85 with wide tracking. */
  logo: { size: "34px", weight: 700, tracking: "0.05em", height: "0.85" },
  /** Product price, the loudest element on a card. */
  price: { size: "30px", weight: 700, tracking: "-0.02em", height: "1" },
  /** Price on the product page buy box. */
  priceLg: { size: "38px", weight: 700, tracking: "-0.02em", height: "1" },
  /** Product card title. Clamped to 2 lines. */
  cardTitle: { size: "17px", weight: 600, tracking: "0", height: "1.1" },
  /** Product page H1. */
  pageTitle: {
    size: "28px",
    weight: 600,
    tracking: "-0.015em",
    height: "1.15",
  },
  /** Category nav links. Uppercase. */
  nav: { size: "13px", weight: 600, tracking: "0.05em", height: "1" },
  /** Filter group headers, section labels. Uppercase. */
  sectionLabel: { size: "12px", weight: 600, tracking: "0.06em", height: "1" },
  /** Body copy. */
  body: { size: "15px", weight: 400, tracking: "0", height: "1.55" },
  /** Spec table, filter options, dense UI. */
  small: { size: "13px", weight: 400, tracking: "0", height: "1.4" },
  /** Sub-price, delivery lines, counts. */
  xs: { size: "11px", weight: 400, tracking: "0", height: "1.3" },
  /** SKU / brand line above the card title. */
  sku: { size: "11px", weight: 400, tracking: "0", height: "1" },
} as const

/**
 * Spacing.
 *
 * DIVERGENCE FROM THE DESIGN SYSTEM FILE — flagged in the plan and confirmed.
 * The upstream token file defines a fractional 1.36-ratio scale (3.4 / 6.8 /
 * 10.2 / 13.6 / 20.4 / 27.2px). The Ustah screens do not use it; they use round
 * values throughout. Fractional steps also produce sub-pixel seams in a layout
 * whose identity is 1px rules. These are the round values the screens actually use.
 */
export const space = {
  1: "4px",
  2: "6px",
  3: "8px",
  4: "9px",
  5: "12px",
  6: "16px",
  7: "20px",
  8: "24px",
  9: "32px",
  10: "40px",
} as const

/**
 * Radii: zero, everywhere.
 *
 * The design system defines sm/md/lg radii, then the blueprint override resets
 * every component to square. Square corners are the brand's identity — this is
 * an industrial hardware catalog, not a consumer app. Do not reintroduce rounding.
 */
export const radius = {
  none: "0",
} as const

/**
 * Layout constants read directly off the desktop screens.
 */
export const layout = {
  /** Design frame width. */
  frame: "1440px",
  /** Horizontal page padding at desktop. */
  gutter: "20px",
  /** Filter sidebar column. */
  sidebar: "264px",
  /** Product card image band. */
  cardImage: "170px",
  /** Header search bar and its submit button. */
  searchHeight: "46px",
  /** Utility strip above the header. */
  utilityHeight: "32px",
  /** Product page: gallery / details / buy box. */
  productColumns: "520px 1fr 340px",
} as const

/**
 * Commerce display constants.
 *
 * These are presentation-only. EUR is the sole transacted currency; the lek
 * figure is an approximate courtesy conversion shown beside it, and the ex-VAT
 * figure is derived from the gross price for trade buyers.
 */
export const commerce = {
  /** Display-only. The design shows a flat 100 L = 1 €. */
  lekPerEur: 100,
  /** Kosovo VAT. Prices in the catalog are VAT-inclusive. */
  vatRate: 0.18,
  /** Free delivery threshold in EUR. */
  freeDeliveryThreshold: 120,
} as const
