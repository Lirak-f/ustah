import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { ensureTraderPromotionWorkflow } from "../workflows/ensure-trader-promotion"

// Title used by the price list this approach replaced. Any list left over from
// that earlier run is removed here so traders are not discounted twice - once
// by the stale list and again by the promotion.
const LEGACY_PRICE_LIST_TITLE = "Trader discount"

/**
 * Sets up the automatic trader discount, and clears out the superseded price
 * list if one is still present.
 *
 * Unlike the price list sync it replaces, this does NOT need re-running when
 * prices change or products are added - the promotion stores a percentage, not
 * amounts. It is idempotent, so running it again is harmless.
 *
 *   pnpm --filter @ustah/backend exec medusa exec ./src/scripts/setup-trader-discount.ts
 */
export default async function setupTraderDiscount({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const pricingService = container.resolve(Modules.PRICING)

  const priceLists = await pricingService.listPriceLists(
    {},
    { take: null, select: ["id", "title"] }
  )

  const legacy = priceLists.filter(
    (list) => list.title === LEGACY_PRICE_LIST_TITLE
  )

  if (legacy.length) {
    await pricingService.deletePriceLists(legacy.map((list) => list.id))
    logger.info(
      `Removed ${legacy.length} superseded trader price list(s); the promotion now applies the discount.`
    )
  }

  const { result } = await ensureTraderPromotionWorkflow(container).run({})

  logger.info(
    result.created
      ? `Created automatic trader discount promotion ${result.promotion_id}.`
      : "Trader discount promotion already present; nothing to do."
  )
}
