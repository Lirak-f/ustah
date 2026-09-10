"use client"

import { convertToLocale } from "@lib/util/money"
import { commerce } from "@ustah/design-tokens"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const vatPct = Math.round(commerce.vatRate * 100)

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div>
      <div className="flex flex-col gap-y-2 text-small text-muted">
        <div className="flex items-center justify-between">
          <span>Nëntotali (pa dërgesë)</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Dërgesa</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>Zbritja</span>
            <span
              className="text-accent"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        {/* Catalog prices are VAT-inclusive, so this is the VAT already contained
            in the total, not an amount added on top. Medusa computes it from the
            18% Kosovo rate on the shipping-country tax region. */}
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">TVSH ({vatPct}%)</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="my-4 h-px w-full border-b border-divider" />
      <div className="mb-2 flex items-center justify-between text-small text-text">
        <span>Totali</span>
        <span
          className="text-page-title font-semibold"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
