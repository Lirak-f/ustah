import { defineConfig } from "eslint/config"
import tsParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"
import nextPlugin from "@next/eslint-plugin-next"
import betterTailwind from "eslint-plugin-better-tailwindcss"

/**
 * Storefront lint rules.
 *
 * The repo-root config applies @medusajs/eslint-plugin, whose recommended set
 * ignores `apps/storefront` outright — so the storefront needs its own flat
 * config. ESLint 9 also prefers `eslint.config.*` over `.eslintrc.json`, which
 * is why these rules live here rather than in the legacy file.
 */
export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "better-tailwindcss": betterTailwind,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      /**
       * Tailwind v4 has no JS config to introspect — the theme lives in the
       * stylesheet. Without this the plugin cannot see the generated @theme
       * block and reports every Ustah token (bg-accent, text-price, …) as an
       * unknown class.
       */
      "better-tailwindcss": { entryPoint: "src/styles/globals.css" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      /**
       * Classes that generate no CSS. These are silent no-ops — a typo like
       * `text-medim-pl` or a class from a design system this app no longer
       * uses looks styled in the source and renders unstyled. Errors, because
       * every one of them is a bug rather than a preference.
       */
      "better-tailwindcss/no-unknown-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",

      /**
       * The legacy fence. The storefront inherited three vocabularies from the
       * Medusa starter — the ui-preset tokens, its txt-* typography, and a set
       * of hand-written @utility text classes — and is migrating onto the
       * Ustah design tokens.
       *
       * Warn while that migration is in progress; a module that has been
       * migrated raises this to error in its own override below, so finished
       * work cannot regress while unfinished work still lints.
       */
      "better-tailwindcss/no-restricted-classes": [
        "warn",
        {
          restrict: [
            {
              pattern: "^(text|bg|border)-ui-",
              message:
                "Medusa preset colour. Use an Ustah token (text-text, text-muted, bg-surface, border-divider) — see docs/legacy-class-map.md.",
            },
            {
              pattern: "^txt-",
              message:
                "Medusa typography class. Use text-body / text-small / text-xs.",
            },
            {
              pattern: "^rounded-(rounded|base|soft|large|circle)$",
              message:
                "Zero border-radius is the Ustah identity. Remove the class.",
            },
            {
              pattern:
                "^text-(xsmall|small|base|large|xl|2xl|3xl)-(regular|semi)$",
              message:
                "Legacy starter typography utility. Use text-xs / text-small / text-body.",
            },
          ],
        },
      ],

      /**
       * Stylistic, and auto-fixed by lint-staged on commit. Warn rather than
       * error so a work-in-progress file still lints cleanly enough to run.
       */
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/enforce-canonical-classes": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
      /**
       * Design tokens are the single source of truth for colour. A hex literal
       * in a component is drift: it survives a token change and quietly breaks
       * the palette. Colours belong in packages/design-tokens/src/tokens.ts and
       * reach components as Tailwind utilities (bg-accent, text-muted, …).
       */
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "Literal[value=/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
          message:
            "Hardcoded hex colour. Use a design token — add it to packages/design-tokens/src/tokens.ts and regenerate, then use the Tailwind utility.",
        },
        {
          selector: "TemplateElement[value.raw=/#(?:[0-9a-fA-F]{3}){1,2}\\b/]",
          message:
            "Hardcoded hex colour in a template literal. Use a design token instead.",
        },
      ],
    },
  },
  {
    /**
     * The kitchen sink prints raw hex values as swatch labels on purpose, so the
     * extraction can be compared against the design file by eye.
     */
    files: ["src/app/kitchen-sink/**"],
    rules: {
      "no-restricted-syntax": "off",
      // The gallery renders legacy classes next to their token replacements
      // so the two can be compared while the migration is under way.
      "better-tailwindcss/no-restricted-classes": "off",
    },
  },
  {
    /**
     * SVG artwork. The hex values here are a drawing's own fills and strokes,
     * not palette choices a token could express, so the colour rule does not
     * apply — unlike a component, this markup is not themed.
     */
    files: [
      "src/modules/common/icons/**",
      "src/modules/layout/components/medusa-cta/**",
      "src/modules/order/components/transfer-image/**",
    ],
    rules: { "no-restricted-syntax": "off" },
  },
])
