"use client"

import { Button } from "@modules/common/components/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-divider pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="flex w-full flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="font-heading text-card-title font-semibold uppercase">
        Ende asnjë porosi
      </h2>
      <p className="text-small text-muted">
        Nuk ke bërë ende asnjë porosi. Le ta ndryshojmë këtë.
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button">Vazhdo blerjet</Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
