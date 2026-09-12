// Shared identifiers for the trader (tregtar/instalues) discount programme.
//
// Traders get a percentage off every product. The discount is delivered by an
// automatic promotion restricted to the trader customer group, so membership
// of that group is the single source of truth for who receives it — nothing in
// the storefront can grant it.
//
// A promotion rather than a price list, deliberately: a price list stores
// materialised amounts per variant, so it silently goes stale whenever a base
// price changes or a product is added and has to be re-synced. A promotion
// stores the percentage itself and is evaluated against the cart at checkout,
// so it stays correct with no maintenance. The trade-off is that the discount
// appears at cart level rather than as a struck-through price on each product
// card.

export const TRADER_GROUP_NAME = "traders"

export const TRADER_DISCOUNT_RATE = 0.1

// Codes a promotion even when automatic — Medusa requires one, and it is what
// identifies this promotion on re-runs so the discount is never duplicated.
export const TRADER_PROMOTION_CODE = "TRADER_DISCOUNT"

export type TraderStatus = "pending" | "approved" | "rejected"

// Customer metadata keys. The request is recorded at signup; approval is a
// separate admin action, so a customer can sit at "pending" indefinitely
// without ever receiving trader pricing.
export type TraderMetadata = {
  account_type?: "standard" | "trader"
  business_number?: string
  trader_status?: TraderStatus
}

export const readTraderMetadata = (
  metadata?: Record<string, unknown> | null
): TraderMetadata => {
  const data = (metadata ?? {}) as Record<string, unknown>

  return {
    account_type:
      data.account_type === "trader"
        ? "trader"
        : data.account_type === "standard"
          ? "standard"
          : undefined,
    business_number:
      typeof data.business_number === "string"
        ? data.business_number
        : undefined,
    trader_status:
      data.trader_status === "pending" ||
      data.trader_status === "approved" ||
      data.trader_status === "rejected"
        ? data.trader_status
        : undefined,
  }
}
