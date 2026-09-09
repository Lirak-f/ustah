import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconChevronDown } from "@modules/common/icons"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-white small:min-h-screen">
      <div className="h-16 border-b bg-white">
        <nav className="content-container flex h-full items-center justify-between">
          <LocalizedClientLink
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-xs font-semibold text-text uppercase"
            data-testid="back-to-cart-link"
          >
            <IconChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden text-small font-semibold text-muted hover:text-text small:block">
              Back to shopping cart
            </span>
            <span className="mt-px block text-small font-semibold text-muted hover:text-text small:hidden">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-page-title text-muted uppercase hover:text-text"
            data-testid="store-link"
          >
            Medusa Store
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="flex w-full items-center justify-center py-4">
        <MedusaCTA />
      </div>
    </div>
  )
}
