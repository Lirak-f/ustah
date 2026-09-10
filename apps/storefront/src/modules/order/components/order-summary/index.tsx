import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 font-heading text-page-title uppercase">
        Përmbledhja
      </h2>
      <div className="flex flex-col gap-y-2 text-small text-muted">
        <div className="flex items-center justify-between">
          <span>Nëntotali</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        {order.discount_total > 0 && (
          <div className="flex items-center justify-between">
            <span>Zbritja</span>
            <span className="text-accent">
              - {getAmount(order.discount_total)}
            </span>
          </div>
        )}
        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between">
            <span>Kartë dhuratë</span>
            <span className="text-accent">
              - {getAmount(order.gift_card_total)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Dërgesa</span>
          <span>{getAmount(order.shipping_total)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taksat</span>
          <span>{getAmount(order.tax_total)}</span>
        </div>
      </div>
      <div className="my-4 h-px w-full border-b border-divider" />
      <div className="flex items-center justify-between text-small text-text">
        <span>Totali</span>
        <span className="text-page-title font-semibold">
          {getAmount(order.total)}
        </span>
      </div>
    </div>
  )
}

export default OrderSummary
