import { cva, type VariantProps } from "class-variance-authority"

/**
 * The Ustah button recipe.
 *
 * Ten-plus hand-written variations of this existed across the nav, search bar,
 * buy box, cart chip, sort bar and filter rail, drifting on height, letter
 * spacing and hover colour. The variants below are those real recipes, not an
 * invented scale.
 *
 * Exported as the class function rather than only as a component because
 * several of these are links (`LocalizedClientLink`, `<a>`) rather than
 * buttons — a nav CTA must stay an anchor to keep middle-click and
 * open-in-new-tab working, so it consumes the recipe without becoming a button.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:bg-border-strong",
  {
    variants: {
      variant: {
        /** Primary action. Add to cart, submit. */
        accent: "bg-accent text-white hover:bg-accent-600",
        /** Header CTA and cart chip; one step darker so it reads on accent. */
        accentDeep: "bg-accent-600 text-white hover:bg-accent-700",
        /**
         * Attention, not primary: the search submit and nothing else at this
         * size. Yellow is reserved for attention in the design.
         */
        attention: "bg-yellow text-text hover:bg-yellow-600",
        /** Unselected chip, filter pill, secondary link-as-button. */
        outline: "border border-border-strong bg-bg hover:border-accent",
        /** Selected chip in a toggle group. */
        selected: "border border-accent bg-accent text-white",
        /** Inline text action ("Fshij të gjitha"). */
        link: "text-accent underline hover:text-accent-600",
      },
      size: {
        /** Chips and pills. */
        chip: "px-3 py-1 text-[12px]",
        /** Toggle in the sort bar. */
        toggle: "px-4 py-2 text-[12px]",
        /** Option pill in the buy box. */
        option: "px-4 py-3 text-[13px]",
        /** Inline text button. */
        text: "px-2 py-1 text-[12px]",
        /**
         * The three real chrome heights. Letter spacing is folded into the size
         * so the 0.04em/0.05em split cannot drift again.
         */
        sm: "h-[38px] px-5 font-heading text-[14px] font-semibold tracking-wider uppercase",
        md: "h-[46px] px-6 font-heading text-[16px] font-semibold tracking-[0.04em] uppercase",
        lg: "h-[52px] px-6 font-heading text-[18px] font-bold tracking-[0.04em] uppercase",
      },
    },
    defaultVariants: { variant: "accent", size: "md" },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
