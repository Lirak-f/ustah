import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@modules/common/components/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const count = items?.reduce((sum, i) => sum + (i.quantity ?? 0), 0) ?? 0

  return (
    <div>
      <div className="flex items-baseline gap-x-2 border-b border-divider p-6">
        <h1 className="text-page-title uppercase" data-testid="cart-page-title">
          Shporta
        </h1>
        {items && (
          <span className="text-small text-muted">
            {count} {count === 1 ? "artikull" : "artikuj"}
          </span>
        )}
      </div>
      <div className="px-6 pb-6">
        <Table>
          <Table.Header className="border-t-0">
            <Table.Row className="text-section-label font-semibold text-muted uppercase hover:bg-transparent">
              <Table.HeaderCell className="pl-0!">Artikulli</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Sasia</Table.HeaderCell>
              <Table.HeaderCell className="hidden small:table-cell">
                Çmimi
              </Table.HeaderCell>
              <Table.HeaderCell className="pr-0! text-right">
                Totali
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item) => {
                    return (
                      <Item
                        key={item.id}
                        item={item}
                        currencyCode={cart?.currency_code}
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

export default ItemsTemplate
