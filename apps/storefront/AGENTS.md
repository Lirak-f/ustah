# AGENTS.md — storefront

App-specific context. The repo-root [AGENTS.md](../../AGENTS.md) still applies.

## Design system

`packages/design-tokens/src/tokens.ts` is the source of truth for every colour,
type step, spacing step, breakpoint and layout dimension. Nothing in the app may
hardcode a hex value — ESLint fails the build on a hex literal in a `.tsx`.

The generator writes the `@theme` block **into** `src/styles/globals.css`
between the `ustah:theme` markers:

```bash
<pm> run build --filter=@ustah/design-tokens
```

It has to land in that file rather than an imported one: Tailwind v4 only builds
utility namespaces from `@theme` in the **entry** stylesheet. A `@theme` reached
through `@import` registers the variables but generates no `bg-accent` /
`text-price` utilities.

There is no `tailwind.config.js`. The v3 config and `@medusajs/ui-preset` were
removed once nothing used them; everything is v4 CSS-first.

### Components

| Where                                  | What                                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src/modules/common/components/ustah/` | Design-native primitives: `buttonVariants`, `Price`, `ProductMedia`, `DiscountBadge`, `SkuLine`, `StockLine`                |
| `src/modules/common/components/ui/`    | The same job for cart/checkout/account/order. 75 importers, so it keeps its path and legacy prop names                      |
| `src/modules/common/icons/`            | One barrel over `lucide-react`. Import from here, never from `lucide-react` directly — the wrapper sets `strokeWidth: 1.75` |
| `src/lib/util/ustah-variant.ts`        | `selectLeadVariant` — the only copy of the rule deciding which variant a listing prices                                     |
| `src/lib/util/ustah-price.ts`          | All money formatting. sq-AL conventions via `de-DE`; read the comments before changing the locale                           |
| `src/lib/util/cn.ts`                   | `clsx` + `tailwind-merge`, configured with this project's scales                                                            |

`buttonVariants` is exported as a class function, not just a component, because
several buttons are links — a nav CTA must stay an anchor to keep middle-click
and open-in-new-tab working.

`/kitchen-sink` renders the primitives for eye-comparison against
`design/ustah-storefront.html`. Not linked from the app.

## Two traps

**1. The spacing scale is ordinal, not 4px multiples.**

| class | px  |     | class  | px  |
| ----- | --- | --- | ------ | --- |
| `p-1` | 4   |     | `p-6`  | 16  |
| `p-2` | 6   |     | `p-7`  | 20  |
| `p-3` | 8   |     | `p-8`  | 24  |
| `p-4` | 9   |     | `p-9`  | 32  |
| `p-5` | 12  |     | `p-10` | 40  |

So `p-5` is 12px, not Tailwind's usual 20px. Do not renumber the scale — every
existing correct use would break. And **distrust editor "canonical class"
suggestions on arbitrary values**: an IDE offering `size-3.5` for `size-[14px]`
or `h-11.5` for `h-[46px]` is computing against a 4px scale this project does
not have. Keep the explicit px value.

**2. `tailwind-merge` must know about custom scales.**

It assumes any unrecognised `text-*` class is a colour, so `cn("text-sku
text-muted")` silently dropped the font size. `src/lib/util/cn.ts` lists the
project's `font-size` and `text-color` groups explicitly. **When you add a
`--text-*` or `--color-*` token, add it there too** or it will be stripped
wherever `cn` runs.

## Lint

`eslint-plugin-better-tailwindcss`, pointed at the entry stylesheet via
`settings["better-tailwindcss"].entryPoint`. That setting is required — v4 has
no JS config to introspect, and without it every design token reads as an
unknown class.

- `no-unknown-classes` is an **error**: a class that generates no CSS looks
  styled in the source and renders unstyled. It found 26 real dead classes on
  its first run.
- `no-restricted-classes` fences the retired Medusa vocabularies. Currently at
  zero uses; it stays as a ratchet.
- The rule is `enforce-canonical-classes`. `suggestCanonicalClasses` is the
  VS Code extension's name for a similar check, not an ESLint rule.

`next.config.js` deliberately does **not** set `typescript.ignoreBuildErrors` or
`eslint.ignoreDuringBuilds`. Both were on, which is how a React version mismatch
reached the build as an opaque minified error. Keep them off.

## Caching

Server-rendered throughout; there is no client-side data-fetching library and no
provider tree. `src/lib/data/*.ts` are `"use server"` modules calling the Medusa
SDK with `next: { tags }` + `cache: "force-cache"`, and mutations `revalidateTag`.

`getCacheTag` in `src/lib/data/cookies.ts` splits tags two ways. Catalog tags
(`products`, `categories`, `collections`, `regions`, `variants`, `locales`,
`payment_providers`) are **global** — shared by every visitor. Everything else
keeps the per-visitor `_medusa_cache_id` suffix that middleware mints.

It is an **allowlist, not a denylist**, on purpose: a tag nobody thought about
stays per-visitor, which is slow but safe. Adding a tag to it asserts that its
data is identical for all shoppers. `middleware.ts` fetches regions under the
same global tag and must stay in sync, or the two cache identical data under
different keys.
