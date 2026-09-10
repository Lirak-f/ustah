"use client"

import { Button } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="border border-border-strong bg-bg">
      <div className="border-b border-divider p-6">
        <h2 className="text-page-title uppercase">Përmbledhja</h2>
      </div>
      <div className="flex flex-col gap-y-4 p-6">
        <DiscountCode cart={cart} />
        <CartTotals totals={cart} />
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
        >
          <Button className="w-full">Vazhdo te arka</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Summary
