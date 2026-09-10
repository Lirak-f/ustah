import { IconBadge, Text } from "@modules/common/components/ui"

import { paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  if (!payment) {
    return null
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 font-heading text-page-title uppercase">Pagesa</h2>
      <div className="grid grid-cols-1 gap-6 small:grid-cols-3">
        <div className="flex flex-col gap-y-1">
          <Text className="text-section-label font-semibold text-muted uppercase">
            Mënyra e pagesës
          </Text>
          <Text className="text-small text-muted" data-testid="payment-method">
            {paymentInfoMap[payment.provider_id]?.title ?? payment.provider_id}
          </Text>
        </div>
        <div className="flex flex-col gap-y-1 small:col-span-2">
          <Text className="text-section-label font-semibold text-muted uppercase">
            Detajet e pagesës
          </Text>
          <div className="flex items-center gap-2 text-small text-muted">
            <IconBadge className="h-7">
              {paymentInfoMap[payment.provider_id]?.icon}
            </IconBadge>
            <Text data-testid="payment-amount">
              {`${convertToLocale({
                amount: payment.amount,
                currency_code: order.currency_code,
              })} me para në dorë gjatë dorëzimit`}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
