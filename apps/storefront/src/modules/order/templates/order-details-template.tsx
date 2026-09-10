"use client"

import { IconArrowLeft } from "@modules/common/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-page-title font-semibold uppercase">
          Detajet e porosisë
        </h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex items-center gap-2 text-small font-semibold text-muted hover:text-text"
          data-testid="back-to-overview-button"
        >
          <IconArrowLeft size={16} /> Kthehu te porositë
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col divide-y divide-divider border border-border-strong bg-bg"
        data-testid="order-details-container"
      >
        <div className="p-6">
          <OrderDetails order={order} showStatus />
        </div>
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
