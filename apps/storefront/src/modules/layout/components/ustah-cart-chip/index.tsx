import { retrieveCart } from "@lib/data/cart"
import { formatEur } from "@lib/util/ustah-price"
import { IconCart } from "@modules/common/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Cart chip in the header. The design shows the cart *total*, not an item
 * count, because trade buyers watch the running total against the 120 € free
 * delivery threshold.
 */
export default async function UstahCartChip() {
  const cart = await retrieveCart().catch(() => null)
  const total = cart?.total ?? 0
  const count =
    cart?.items?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0

  return (
    <LocalizedClientLink
      href="/cart"
      data-testid="nav-cart-link"
      className="flex shrink-0 items-center gap-4 bg-accent-600 px-5 py-4 text-[13px] leading-[1.2] text-white transition-colors hover:bg-accent-700"
    >
      <IconCart className="size-6" />
      <span>
        Shporta
        <br />
        <b className="font-heading text-[16px]">{formatEur(total)}</b>
      </span>
      <span className="sr-only">{count} artikuj në shportë</span>
    </LocalizedClientLink>
  )
}
