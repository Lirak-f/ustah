import { defineConfig } from "eslint/config"
import tsParser from "@typescript-eslint/parser"
import reactHooks from "eslint-plugin-react-hooks"
import nextPlugin from "@next/eslint-plugin-next"

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
    plugins: { "react-hooks": reactHooks, "@next/next": nextPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
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
    rules: { "no-restricted-syntax": "off" },
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
