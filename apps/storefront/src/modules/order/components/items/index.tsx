import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@modules/common/components/ui"

import Item from "@modules/order/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items

  return (
    <div>
      <div className="border-b border-divider p-6">
        <h2 className="font-heading text-page-title uppercase">Artikujt</h2>
      </div>
      <div className="px-6 pb-6">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row className="text-section-label font-semibold text-muted uppercase hover:bg-transparent">
              <Table.HeaderCell className="pl-0!">Artikulli</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell className="pr-0! text-right">
                Totali
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body data-testid="products-table">
            {items?.length
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={order.currency_code}
                      />
                    )
                  })
              : repeat(5).map((i) => {
                  return <SkeletonLineItem key={i} />
                })}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Items
