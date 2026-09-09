import { readFileSync, writeFileSync } from "node:fs"
import { execSync } from "node:child_process"

// Ordered: longer/more specific patterns first so a prefix never shadows a
// longer name (text-ui-fg-base before text-ui-fg).
const MAP = [
  // colour
  ["text-ui-fg-on-color", "text-white"],
  ["text-ui-fg-interactive-hover", "text-accent-600"],
  ["text-ui-fg-interactive", "text-accent"],
  ["text-ui-fg-subtle", "text-muted"],
  ["text-ui-fg-muted", "text-faint"],
  ["text-ui-fg-disabled", "text-faint"],
  ["text-ui-fg-error", "text-danger"],
  ["text-ui-fg-base", "text-text"],
  ["text-ui-tag-red-text", "text-danger"],
  ["text-ui-tag-green-text", "text-accent"],
  ["text-ui-tag-blue-text", "text-accent"],
  ["text-ui-tag-orange-text", "text-text"],
  ["bg-ui-bg-interactive", "bg-accent"],
  ["bg-ui-bg-field-hover", "bg-surface-alt"],
  ["bg-ui-bg-field", "bg-surface"],
  ["bg-ui-bg-subtle-hover", "bg-surface-alt"],
  ["bg-ui-bg-subtle", "bg-surface"],
  ["bg-ui-bg-component-pressed", "bg-surface-alt"],
  ["bg-ui-bg-component-hover", "bg-surface-alt"],
  ["bg-ui-bg-component", "bg-surface"],
  ["bg-ui-bg-disabled", "bg-surface"],
  ["bg-ui-bg-highlight", "bg-accent-100"],
  ["bg-ui-bg-base-hover", "bg-surface"],
  ["bg-ui-bg-base", "bg-bg"],
  ["bg-ui-tag-red-bg", "bg-surface"],
  ["bg-ui-tag-green-bg", "bg-accent-100"],
  ["bg-ui-tag-blue-bg", "bg-accent-100"],
  ["bg-ui-tag-orange-bg", "bg-surface"],
  ["border-ui-border-interactive", "border-accent"],
  ["border-ui-border-strong", "border-border-strong"],
  ["border-ui-border-error", "border-danger"],
  ["border-ui-border-base", "border-divider"],
  ["border-ui-tag-red-border", "border-divider"],
  ["border-ui-tag-green-border", "border-divider"],
  ["border-ui-tag-blue-border", "border-divider"],
  ["border-ui-tag-orange-border", "border-divider"],
  // typography — sizes verified against the compiled stylesheet
  ["txt-compact-xlarge-plus", "text-page-title"],
  ["txt-compact-xlarge", "text-page-title"],
  ["txt-compact-large-plus", "text-body font-semibold"],
  ["txt-compact-large", "text-body"],
  ["txt-compact-medium-plus", "text-small font-semibold"],
  ["txt-compact-medium", "text-small"],
  ["txt-compact-small-plus", "text-section-label font-semibold"],
  ["txt-compact-small", "text-section-label"],
  ["txt-xlarge", "text-page-title"],
  ["txt-large", "text-body"],
  ["txt-medium-plus", "text-small font-semibold"],
  ["txt-medium", "text-small"],
  ["txt-small-plus", "text-section-label font-semibold"],
  ["txt-small", "text-section-label"],
  ["text-xsmall-regular", "text-xs"],
  ["text-small-regular", "text-xs"],
  ["text-small-semi", "text-xs font-semibold"],
  ["text-base-regular", "text-small"],
  ["text-base-semi", "text-small font-semibold"],
  ["text-large-regular", "text-body"],
  ["text-large-semi", "text-body font-semibold"],
  ["text-xl-regular", "text-page-title"],
  ["text-xl-semi", "text-page-title font-semibold"],
  ["text-2xl-regular", "text-page-title"],
  ["text-2xl-semi", "text-page-title font-semibold"],
  ["text-3xl-regular", "text-page-title"],
  ["text-3xl-semi", "text-page-title font-semibold"],
  // radius: zero radius is the identity -> drop the class
  ["rounded-rounded", ""],
  ["rounded-base", ""],
  ["rounded-soft", ""],
  ["rounded-large", ""],
  ["rounded-circle", ""],
]

const targets = process.argv.slice(2)
const files = execSync(
  `grep -rl -E '${MAP.map(([a]) => a).join("|")}' ${targets.join(" ")} --include='*.tsx' --include='*.ts' || true`,
  { encoding: "utf8" },
)
  .trim()
  .split("\n")
  .filter(Boolean)

let changed = 0,
  total = 0
for (const file of files) {
  let src = readFileSync(file, "utf8")
  const before = src
  for (const [from, to] of MAP) {
    // Only inside class strings: match the bare token with class-name
    // boundaries, and allow variant prefixes (hover:, sm:, group-*:).
    const re = new RegExp(`(?<![\\w-])${from}(?![\\w-])`, "g")
    const hits = src.match(re)
    if (hits) {
      total += hits.length
      src = src.replace(re, to)
    }
  }
  // Collapse whitespace left by dropped classes, inside quoted strings only.
  src = src.replace(
    /className="([^"]*)"/g,
    (m, c) => `className="${c.replace(/\s+/g, " ").trim()}"`,
  )
  if (src !== before) {
    writeFileSync(file, src)
    changed++
  }
}
console.log(`files changed: ${changed}, replacements: ${total}`)
