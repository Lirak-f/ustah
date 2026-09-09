/**
 * Generates theme.css (Tailwind v4 @theme block + @font-face rules) from tokens.ts.
 *
 * Run with `pnpm --filter @ustah/design-tokens build`. The output is committed so
 * the storefront can import it without a build step in the dependency graph.
 *
 * Tailwind v4 takes its theme from CSS custom properties inside @theme, not from
 * a JS config object — do not port v3-era tailwind.config.js tutorials here.
 */

import { writeFileSync, readFileSync, readdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { colors, fonts, space, layout, type } from "./tokens"

const here = dirname(fileURLToPath(import.meta.url))
const fontDir = join(here, "../../../design/extracted/fonts")

/** Unicode ranges per subset, copied from the bundle's own @font-face rules. */
const UNICODE_RANGES: Record<string, string> = {
  latin:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  // Albanian ë and ç live here. Dropping this subset breaks the language.
  "latin-ext":
    "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  vietnamese:
    "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
}

const FAMILY_BY_SLUG: Record<string, string> = {
  barlow: "Barlow",
  "barlow-condensed": "Barlow Condensed",
}

function fontFaces(): string {
  const files = readdirSync(fontDir)
    .filter((f) => f.endsWith(".woff2"))
    .sort()
  return files
    .map((file) => {
      // e.g. barlow-condensed-600-latin-ext.woff2
      const m = file.match(
        /^(.*?)-(\d{3})-(latin-ext|latin|vietnamese)\.woff2$/
      )
      if (!m) throw new Error(`Unexpected font filename: ${file}`)
      const [, slug, weight, subset] = m
      const family = FAMILY_BY_SLUG[slug]
      if (!family) throw new Error(`Unknown font family slug: ${slug}`)
      return [
        `/* ${family} ${weight} — ${subset} */`,
        `@font-face {`,
        `  font-family: '${family}';`,
        `  font-style: normal;`,
        `  font-weight: ${weight};`,
        `  font-display: swap;`,
        `  src: url('/fonts/${file}') format('woff2');`,
        `  unicode-range: ${UNICODE_RANGES[subset]};`,
        `}`,
      ].join("\n")
    })
    .join("\n\n")
}

/** Flattens the nested colour object into Tailwind's --color-* namespace. */
function colorVars(): string {
  const out: string[] = []
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      out.push(`  --color-${kebab(name)}: ${value};`)
      continue
    }
    for (const [step, hex] of Object.entries(value)) {
      out.push(
        step === "DEFAULT"
          ? `  --color-${kebab(name)}: ${hex};`
          : `  --color-${kebab(name)}-${step}: ${hex};`
      )
    }
  }
  return out.join("\n")
}

const kebab = (s: string) =>
  s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

function themeBlock(): string {
  const spacing = Object.entries(space)
    .map(([k, v]) => `  --spacing-${k}: ${v};`)
    .join("\n")

  const layoutVars = Object.entries(layout)
    .map(([k, v]) => `  --layout-${kebab(k)}: ${v};`)
    .join("\n")

  // Each type role becomes a --text-* size plus companion weight/tracking/leading
  // vars, so `text-price` in a component carries all four properties.
  const typeVars = Object.entries(type)
    .flatMap(([role, t]) => [
      `  --text-${kebab(role)}: ${t.size};`,
      `  --text-${kebab(role)}--line-height: ${t.height};`,
      `  --text-${kebab(role)}--font-weight: ${t.weight};`,
      `  --text-${kebab(role)}--letter-spacing: ${t.tracking};`,
    ])
    .join("\n")

  return `@theme {
  /* ── Colour ─────────────────────────────────────────────────────── */
${colorVars()}

  /* ── Type ───────────────────────────────────────────────────────── */
  --font-heading: ${fonts.heading};
  --font-body: ${fonts.body};
  --font-mono: ${fonts.mono};

${typeVars}

  /* ── Spacing ────────────────────────────────────────────────────── */
${spacing}

  /* ── Layout ─────────────────────────────────────────────────────── */
${layoutVars}

  /* ── Radii ──────────────────────────────────────────────────────── */
  /* Square is the identity. There is no rounded variant on purpose. */
  --radius-none: 0;
}`
}

const banner = `/**
 * GENERATED FILE — DO NOT EDIT.
 *
 * Source: packages/design-tokens/src/tokens.ts
 * Regenerate: pnpm --filter @ustah/design-tokens build
 */`

const base = `/* ── Base ───────────────────────────────────────────────────────────── */

:root {
  color-scheme: light;
}

body {
  background: var(--color-page);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--text-body--line-height);
  /* Prices sit in columns across cards and the spec table; without this the
     digits jitter between rows. The design sets it globally. */
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  margin: 0;
}

/* The design uses zero border-radius everywhere. Reset UA styles that add it. */
button, input, select, textarea {
  border-radius: 0;
  font: inherit;
}
`

/**
 * Two outputs, because Tailwind v4 treats them differently:
 *
 *  - fonts.css  — @font-face rules. Safe to reach via @import.
 *  - the @theme block — must be INLINED into the consuming entry stylesheet.
 *    Tailwind builds its utility namespaces (bg-*, text-*, font-*) only from
 *    @theme blocks it sees in the entry file; one behind an @import registers
 *    the variables but generates no utilities. So we splice it into
 *    globals.css between the ustah:theme markers.
 */
writeFileSync(
  join(here, "fonts.css"),
  [banner, fontFaces()].join("\n\n") + "\n"
)
console.log("✓ wrote packages/design-tokens/src/fonts.css")

const START = "/* ustah:theme:start */"
const END = "/* ustah:theme:end */"

const target = join(here, "../../../apps/storefront/src/styles/globals.css")
const current = readFileSync(target, "utf8")
const from = current.indexOf(START)
const to = current.indexOf(END)

if (from === -1 || to === -1) {
  throw new Error(
    `Missing ${START} / ${END} markers in ${target}. ` +
      "The generated @theme block has nowhere to go."
  )
}

const spliced =
  current.slice(0, from + START.length) +
  "\n" +
  [themeBlock(), base].join("\n\n") +
  "\n" +
  current.slice(to)

writeFileSync(target, spliced)
console.log("✓ spliced @theme into apps/storefront/src/styles/globals.css")
