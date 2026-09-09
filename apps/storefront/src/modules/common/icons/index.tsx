import type { LucideIcon, LucideProps } from "lucide-react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Blocks,
  Bolt,
  CheckCircle2,
  ChevronDown,
  ChevronsUpDown,
  CircleAlert,
  CircleSmall,
  CircleX,
  CreditCard,
  Drill,
  Eye,
  EyeOff,
  FileText,
  Flame,
  HardHat,
  ImageOff,
  LoaderCircle,
  LogOut,
  MapPin,
  Menu,
  Package,
  PaintRoller,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  ShowerHead,
  Trash2,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react"

/**
 * The storefront's icon set.
 *
 * Everything is drawn by lucide-react. Before this the app carried three
 * hand-maintained SVG sets — a bespoke Ustah set, a `medusa-compat` set, and a
 * dozen loose files — which between them duplicated six glyphs and declared two
 * incompatible prop contracts.
 *
 * `medusa-compat` existed only because `@medusajs/icons` resolved the workspace
 * root's React 18 while this app runs React 19. The pnpm migration gave the
 * storefront its own peer-resolved dependency tree, so that workaround is no
 * longer needed and lucide renders here correctly.
 *
 * Names are the app's own, not lucide's, so a call site never has to know which
 * lucide glyph backs a concept — and swapping the glyph later is a one-line
 * change here rather than a codemod.
 */

export type IconProps = LucideProps

/**
 * Icon sizes, taken from what the design actually uses.
 *
 * Expressed in px rather than through the Tailwind spacing scale on purpose:
 * that scale is remapped to ordinal design steps (`--spacing-5` is 12px, not
 * 20px), so `size-5` on an icon would not mean 20px.
 */
export const iconSize = {
  /** Inline with small text. */
  sm: 16,
  /** Default UI affordance: nav, chevrons, form adornments. */
  md: 19,
  /** Header actions, cart chip. */
  lg: 23,
  /** Category tiles. */
  xl: 34,
} as const

export type IconSize = keyof typeof iconSize

/**
 * lucide defaults to a 2px stroke; the Ustah set was drawn at 1.75 and the
 * design's hairlines depend on it. Applied once here so every icon matches.
 */
const STROKE_WIDTH = 1.75

const withDefaults = (Glyph: LucideIcon) => {
  const Wrapped = ({ strokeWidth = STROKE_WIDTH, ...props }: IconProps) => (
    <Glyph strokeWidth={strokeWidth} aria-hidden focusable="false" {...props} />
  )
  Wrapped.displayName = `Icon(${Glyph.displayName ?? "lucide"})`
  return Wrapped
}

/* ── Chrome ──────────────────────────────────────────────────────────── */

export const IconMenu = withDefaults(Menu)
export const IconSearch = withDefaults(Search)
export const IconUser = withDefaults(User)
export const IconCart = withDefaults(ShoppingCart)

/* ── Trust bar ───────────────────────────────────────────────────────── */

/** Cash on delivery. */
export const IconCash = withDefaults(Banknote)
export const IconTruck = withDefaults(Truck)
export const IconBox = withDefaults(Package)
export const IconInvoice = withDefaults(FileText)

/* ── Trade categories ────────────────────────────────────────────────── */

export const IconPowerTool = withDefaults(Drill)
export const IconPlumbing = withDefaults(ShowerHead)
export const IconHeating = withDefaults(Flame)
export const IconElectrical = withDefaults(Zap)
export const IconFasteners = withDefaults(Bolt)
export const IconCement = withDefaults(Blocks)
export const IconPaint = withDefaults(PaintRoller)
export const IconSafety = withDefaults(HardHat)

/* ── Interface ───────────────────────────────────────────────────────── */

export const IconChevronDown = withDefaults(ChevronDown)
export const IconChevronUpDown = withDefaults(ChevronsUpDown)
export const IconX = withDefaults(X)
export const IconPlus = withDefaults(Plus)
export const IconTrash = withDefaults(Trash2)
export const IconEdit = withDefaults(Pencil)
export const IconEye = withDefaults(Eye)
export const IconEyeOff = withDefaults(EyeOff)
export const IconMapPin = withDefaults(MapPin)
export const IconPackage = withDefaults(Package)
export const IconRefresh = withDefaults(RefreshCw)
export const IconCreditCard = withDefaults(CreditCard)
export const IconArrowLeft = withDefaults(ArrowLeft)
export const IconArrowRight = withDefaults(ArrowRight)
export const IconArrowUpRight = withDefaults(ArrowUpRight)
export const IconSignOut = withDefaults(LogOut)
export const IconPlaceholderImage = withDefaults(ImageOff)

/** Radio/option bullet. */
export const IconDot = withDefaults(CircleSmall)

/* ── Status ──────────────────────────────────────────────────────────── */

export const IconCheckCircle = withDefaults(CheckCircle2)
export const IconXCircle = withDefaults(CircleX)
export const IconAlertCircle = withDefaults(CircleAlert)

/**
 * Spinner. `animate-spin` is applied here rather than at each call site, since
 * a non-spinning spinner is never what the caller wanted.
 */
export const IconSpinner = ({ className, ...props }: IconProps) => (
  <LoaderCircle
    strokeWidth={STROKE_WIDTH}
    aria-hidden
    focusable="false"
    className={`animate-spin ${className ?? ""}`.trim()}
    {...props}
  />
)
