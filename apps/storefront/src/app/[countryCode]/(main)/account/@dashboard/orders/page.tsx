import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Porositë",
  description: "Përmbledhje e porosive të tua të mëparshme.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="font-heading text-page-title font-semibold uppercase">
          Porositë
        </h1>
        <p className="text-small text-muted">
          Shiko porositë e mëparshme dhe statusin e tyre. Mund të krijosh edhe
          kthime ose ndërrime për porositë kur të duhet.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
