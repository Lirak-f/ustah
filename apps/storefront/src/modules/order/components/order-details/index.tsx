import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Text className="text-small text-muted">
        Konfirmimin e porosisë e kemi dërguar te{" "}
        <span className="font-semibold text-text" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>
      <Text className="text-small text-muted">
        Data e porosisë:{" "}
        <span className="text-text" data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      <Text className="text-small text-muted">
        Numri i porosisë:{" "}
        <span className="font-semibold text-accent" data-testid="order-id">
          #{order.display_id}
        </span>
      </Text>

      {showStatus && (
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
          <Text className="text-small text-muted">
            Statusi i porosisë:{" "}
            <span className="text-text" data-testid="order-status">
              {formatStatus(order.fulfillment_status)}
            </span>
          </Text>
          <Text className="text-small text-muted">
            Statusi i pagesës:{" "}
            <span className="text-text" data-testid="order-payment-status">
              {formatStatus(order.payment_status)}
            </span>
          </Text>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
