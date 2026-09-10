import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="p-6">
      <h2 className="mb-4 font-heading text-page-title uppercase">Dërgesa</h2>
      <div className="grid grid-cols-1 gap-6 small:grid-cols-3">
        <div
          className="flex flex-col gap-y-1"
          data-testid="shipping-address-summary"
        >
          <Text className="text-section-label font-semibold text-muted uppercase">
            Adresa e dërgesës
          </Text>
          <Text className="text-small text-muted">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="text-small text-muted">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="text-small text-muted">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="text-small text-muted">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex flex-col gap-y-1"
          data-testid="shipping-contact-summary"
        >
          <Text className="text-section-label font-semibold text-muted uppercase">
            Kontakti
          </Text>
          <Text className="text-small text-muted">
            {order.shipping_address?.phone}
          </Text>
          <Text className="text-small text-muted">{order.email}</Text>
        </div>

        <div
          className="flex flex-col gap-y-1"
          data-testid="shipping-method-summary"
        >
          <Text className="text-section-label font-semibold text-muted uppercase">
            Mënyra
          </Text>
          <Text className="text-small text-muted">
            {(order.shipping_methods?.[0] as { name?: string })?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
