import {
  ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react"

import { cn } from "@lib/util/cn"
import { buttonVariants } from "@modules/common/components/ustah"

/**
 * Shared primitives for the transactional half of the app — cart, checkout,
 * account and order.
 *
 * These arrived with the Medusa starter styled against a generic palette
 * (bg-black, rounded-md, text-gray-500) that contradicts the Ustah design in
 * every respect. They are re-implemented here against the design tokens rather
 * than replaced, because 75 files import this module: keeping the path and the
 * prop shapes means the migration is this file instead of a codemod across all
 * of them.
 *
 * The catalog side uses `../ustah` directly. Over time these should converge on
 * that; the legacy prop names (`variant="primary"`, `size="large"`) are kept as
 * aliases until then.
 */

/**
 * `clx` is the name 27 call sites already use. It resolves Tailwind conflicts
 * rather than merely concatenating, so the `className` overrides those callers
 * pass actually win against a component's own defaults — with plain clsx they
 * silently depended on stylesheet order.
 */
export { cn as clx }

// Text
type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div"
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", children, ...props }, ref) => (
    <Component ref={ref} className={cn("text-small", className)} {...props}>
      {children}
    </Component>
  ),
)
Text.displayName = "Text"

// Heading
type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: "h1" | "h2" | "h3"
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level: Component = "h2", children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "font-heading font-semibold",
        Component === "h1" && "text-page-title",
        Component === "h2" && "text-card-title",
        Component === "h3" && "text-body",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
)
Heading.displayName = "Heading"

// Button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "transparent" | "danger"
  size?: "small" | "medium" | "large"
  isLoading?: boolean
}

/** Legacy prop names, mapped onto the design's own variants. */
const BUTTON_VARIANT = {
  primary: "accent",
  secondary: "outline",
  transparent: "outline",
  danger: "accent",
} as const

const BUTTON_SIZE = { small: "sm", medium: "md", large: "md" } as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({
          variant: BUTTON_VARIANT[variant],
          size: BUTTON_SIZE[size],
        }),
        variant === "transparent" && "border-transparent bg-transparent",
        variant === "danger" && "bg-danger hover:bg-danger",
        className,
      )}
      {...props}
    >
      {isLoading ? "Duke u ngarkuar…" : children}
    </button>
  ),
)
Button.displayName = "Button"

// Container — a plain white panel on the page ground.
type ContainerProps = HTMLAttributes<HTMLDivElement>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("border border-divider bg-bg p-5", className)}
      {...props}
    >
      {children}
    </div>
  ),
)
Container.displayName = "Container"

// Badge — square, per the zero-radius identity.
type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  color?: "green" | "red" | "blue" | "orange" | "grey" | "purple"
}

/**
 * The starter's six colours collapse onto the design's three tones: the palette
 * has one accent for structure, one for attention, and a danger red.
 */
const BADGE_TONE = {
  green: "bg-accent-100 text-accent-800",
  blue: "bg-accent-100 text-accent-800",
  purple: "bg-accent-100 text-accent-800",
  orange: "bg-yellow text-text",
  red: "bg-surface text-danger",
  grey: "bg-surface text-muted",
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, color = "grey", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-semibold",
        BADGE_TONE[color],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
)
Badge.displayName = "Badge"

type IconBadgeProps = HTMLAttributes<HTMLSpanElement>

export const IconBadge = forwardRef<HTMLSpanElement, IconBadgeProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center bg-surface p-1",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
)
IconBadge.displayName = "IconBadge"

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center p-2 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)
IconButton.displayName = "IconButton"

// Label
type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-small font-medium", className)}
      {...props}
    >
      {children}
    </label>
  ),
)
Label.displayName = "Label"

// Input
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full border border-divider bg-bg px-4 py-2 text-small placeholder:text-faint focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60",
          className,
        )}
        {...props}
      />
    </div>
  ),
)
Input.displayName = "Input"

// Table — compound export shape is load-bearing in 8 files.
type TableProps = TableHTMLAttributes<HTMLTableElement>

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-small", className)}
      {...props}
    >
      {children}
    </table>
  ),
)
TableRoot.displayName = "Table"

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b [&_tr]:border-divider", className)}
      {...props}
    >
      {children}
    </thead>
  ),
)
TableHeader.displayName = "TableHeader"

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {children}
    </tbody>
  ),
)
TableBody.displayName = "TableBody"

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-divider transition-colors hover:bg-surface",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  ),
)
TableRow.displayName = "TableRow"

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-heading text-section-label font-semibold text-muted uppercase has-[[role=checkbox]]:pr-0",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  ),
)
TableHead.displayName = "TableHead"

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle has-[[role=checkbox]]:pr-0", className)}
      {...props}
    >
      {children}
    </td>
  ),
)
TableCell.displayName = "TableCell"

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  HeaderCell: TableHead,
  Cell: TableCell,
})

// RadioGroup
type RadioGroupProps = HTMLAttributes<HTMLDivElement>

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  ),
)
RadioGroupRoot.displayName = "RadioGroup"

type RadioGroupItemProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="radio"
        id={id}
        className={cn("size-4 accent-accent", className)}
        {...props}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  ),
)
RadioGroupItem.displayName = "RadioGroupItem"

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})

// Checkbox
type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={cn("size-4 accent-accent", className)}
        {...props}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  ),
)
Checkbox.displayName = "Checkbox"
