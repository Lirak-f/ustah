import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconChevronDown } from "@modules/common/icons"
import { Text } from "@modules/common/components/ui"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-white small:min-h-screen">
      <div className="h-16 border-b border-divider bg-white">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-xs font-semibold text-text uppercase"
            data-testid="back-to-cart-link"
          >
            <IconChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden text-small font-semibold text-muted hover:text-text small:block">
              Kthehu te shporta
            </span>
            <span className="mt-px block text-small font-semibold text-muted hover:text-text small:hidden">
              Kthehu
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-end gap-1 text-text hover:opacity-80"
            data-testid="store-link"
          >
            <span className="font-heading text-[40px] leading-[0.85] font-bold tracking-wider">
              USTAH
            </span>
            <span className="mb-1 block size-[11px] bg-yellow" aria-hidden />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex w-full items-center justify-center border-t border-divider py-4">
        <Text className="text-section-label text-muted">
          © {new Date().getFullYear()} Ustah
        </Text>
      </div>
    </div>
  )
}
