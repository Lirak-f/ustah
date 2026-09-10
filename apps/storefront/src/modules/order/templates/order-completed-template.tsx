import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="bg-page py-12">
      <div className="content-container flex flex-col items-center gap-y-6 px-0">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex w-full max-w-3xl flex-col divide-y divide-divider border border-border-strong bg-bg"
          data-testid="order-complete-container"
        >
          <div className="p-6">
            <h1 className="mb-3 font-heading text-page-title font-semibold uppercase">
              Faleminderit! Porosia u krye me sukses.
            </h1>
            <OrderDetails order={order} />
          </div>
          <Items order={order} />
          <div className="p-6">
            <CartTotals totals={order} />
          </div>
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
