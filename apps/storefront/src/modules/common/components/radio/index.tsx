/**
 * Radio indicator for the checkout option lists (address, delivery, payment).
 *
 * Presentational only — the surrounding label or button owns the click, which
 * is why this renders a `role="radio"` element that is not itself focusable
 * beyond its parent's focus ring.
 *
 * The previous implementation leaned on Medusa preset utilities
 * (`shadow-borders-strong-with-shadow`, `shadow-borders-interactive`,
 * `shadow-details-contrast-on-bg-interactive`, `group-radix-state-checked:*`)
 * that the v4 build does not generate — verified with a PostCSS probe. The
 * checked state therefore produced no CSS at all and the control never looked
 * selected. These are plain borders and token colours instead.
 *
 * A radio is the one place the zero-radius rule does not apply: a square
 * "radio" reads as a checkbox, and the distinction carries the semantics.
 */
const Radio = ({
  checked,
  "data-testid": dataTestId,
}: {
  checked: boolean
  "data-testid"?: string
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      tabIndex={-1}
      className="group relative flex size-5 items-center justify-center outline-hidden"
      data-testid={dataTestId || "radio-button"}
    >
      <div
        className={`flex size-[14px] items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-accent bg-accent"
            : "border-border-strong bg-bg group-hover:border-accent"
        }`}
      >
        {checked && <div className="size-1.5 rounded-full bg-bg" />}
      </div>
    </button>
  )
}

export default Radio
