# Legacy class map

The storefront inherited three styling vocabularies from the Medusa starter and
is migrating onto the Ustah design tokens. This file is the authoritative
mapping. `better-tailwindcss/no-restricted-classes` warns on every class in the
left column and points here.

Sizes below were read out of the compiled stylesheet, not guessed. Note the
Ustah `@theme` **overrides** Tailwind's `--text-xs` to 11px, so some legacy
classes already render at an Ustah size.

## Colour

| Legacy                         | Replacement            | Note |
| ------------------------------ | ---------------------- | ---- |
| `text-ui-fg-base`              | `text-text`            |      |
| `text-ui-fg-subtle`            | `text-muted`           |      |
| `text-ui-fg-muted`             | `text-faint`           |      |
| `text-ui-fg-interactive`       | `text-accent`          |      |
| `text-ui-fg-error`             | `text-danger`          |      |
| `text-ui-fg-on-color`          | `text-white`           |      |
| `bg-ui-bg-base`                | `bg-bg`                |      |
| `bg-ui-bg-subtle`              | `bg-surface`           |      |
| `bg-ui-bg-field`               | `bg-surface`           |      |
| `bg-ui-bg-component`           | `bg-surface`           |      |
| `bg-ui-bg-interactive`         | `bg-accent`            |      |
| `border-ui-border-base`        | `border-divider`       |      |
| `border-ui-border-strong`      | `border-border-strong` |      |
| `border-ui-border-interactive` | `border-accent`        |      |

`text-ui-fg-subtle` to `text-muted` is a colour _change_, not a rename: Medusa's
subtle grey and `#4A5058` are not the same value. Migrate a module, compare it
against the design, then accept the mapping.

## Typography

Both scales in px, as compiled:

| Ustah                | px  | Tailwind default (as overridden) | px  |
| -------------------- | --- | -------------------------------- | --- |
| `text-body`          | 15  | `text-xs`                        | 11  |
| `text-small`         | 13  | `text-sm`                        | 14  |
| `text-xs`            | 11  | `text-base`                      | 16  |
| `text-sku`           | 11  |                                  |     |
| `text-nav`           | 13  |                                  |     |
| `text-section-label` | 12  |                                  |     |

| Legacy                            | Renders at | Replacement                | Note                                          |
| --------------------------------- | ---------- | -------------------------- | --------------------------------------------- |
| `txt-medium`                      | 14px       | `text-small`               | 13px; `text-body` (15px) if the line is prose |
| `txt-compact-medium`              | 14px       | `text-small`               |                                               |
| `txt-small` / `txt-compact-small` | 12px       | `text-section-label`       | or `text-xs`                                  |
| `text-xsmall-regular`             | 10px       | `text-xs`                  |                                               |
| `text-small-regular`              | 11px       | `text-xs`                  | already 11px via the override                 |
| `text-small-semi`                 | 11px       | `text-xs font-semibold`    |                                               |
| `text-base-regular`               | 14px       | `text-small`               |                                               |
| `text-base-semi`                  | 14px       | `text-small font-semibold` |                                               |
| `text-large-regular`              | 16px       | `text-body`                |                                               |
| `text-large-semi`                 | 16px       | `text-body font-semibold`  |                                               |
| `text-xl-regular` / `-semi`       | 24px       | `text-page-title`          | 28px; the design has no 24px step             |
| `text-2xl-regular` / `-semi`      | 30px       | `text-page-title`          |                                               |
| `text-3xl-regular` / `-semi`      | 32px       | `text-page-title`          |                                               |

There is no exact Ustah equivalent for the 24-32px range: the design jumps from
`card-title` (17px) to `page-title` (28px). Use `text-page-title` and accept the
step change rather than reintroducing an arbitrary size.

## Radius

| Legacy                                                                                                                           | Replacement          |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `rounded-rounded`, `rounded-base`, `rounded-soft`, `rounded-large`, `rounded-circle`, `rounded-md`, `rounded-lg`, `rounded-full` | **delete the class** |

Zero border-radius is the brand identity, not an oversight. The one exception is
the radio indicator, where a square control reads as a checkbox and the shape
carries the semantics.

## No token equivalent

These have no replacement and need a decision per use:

- `shadow-borders-base`, `shadow-borders-interactive`,
  `shadow-borders-strong-with-shadow`, `shadow-details-contrast-on-bg-interactive`
  — most of these never generated any CSS at all. Replace with a real
  `border` plus a token colour.
- `group-radix-state-*` — from the v3 `tailwindcss-radix` plugin. v4 expresses
  this natively as `group-data-[state=...]:`.
- `shadow-elevation-*` — the design has no elevation system; surfaces are
  separated by 1px dividers.

## Spacing: do not "fix" this scale

`--spacing-1` through `--spacing-10` are **ordinal design steps, not 4px
multiples**:

| class | px  |     | class  | px  |
| ----- | --- | --- | ------ | --- |
| `p-1` | 4   |     | `p-6`  | 16  |
| `p-2` | 6   |     | `p-7`  | 20  |
| `p-3` | 8   |     | `p-8`  | 24  |
| `p-4` | 9   |     | `p-9`  | 32  |
| `p-5` | 12  |     | `p-10` | 40  |

So `p-5` is 12px, not Tailwind's usual 20px, and `p-4` is 9px.

Two consequences:

1. Do not renumber the scale. Every existing correct use would break.
2. Distrust editor "canonical class" suggestions on arbitrary values. An IDE
   offering `size-3.5` for `size-[14px]` or `h-11.5` for `h-[46px]` is computing
   against a 4px scale this project does not have. Keep the explicit px value.
