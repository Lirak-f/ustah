import {
  createWorkflow,
  createStep,
  StepResponse,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk"
import {
  ApplicationMethodAllocation,
  ApplicationMethodTargetType,
  ApplicationMethodType,
  Modules,
  PromotionRuleOperator,
  PromotionStatus,
  PromotionType,
} from "@medusajs/framework/utils"
import { createPromotionsWorkflow } from "@medusajs/medusa/core-flows"
import {
  TRADER_DISCOUNT_RATE,
  TRADER_GROUP_NAME,
  TRADER_PROMOTION_CODE,
} from "../lib/trader"

type PreparedPromotion = {
  group_id: string
  exists: boolean
}

/**
 * Resolves the trader group and reports whether the promotion already exists.
 *
 * Unlike the price list this replaced, the promotion stores a PERCENTAGE rule
 * rather than materialised amounts, so it is created once and then needs no
 * maintenance: new products and base price changes are discounted
 * automatically because the 10% is evaluated against the cart at checkout.
 */
const prepareTraderPromotionStep = createStep(
  "prepare-trader-promotion",
  async (_, { container }) => {
    const customerService = container.resolve(Modules.CUSTOMER)
    const promotionService = container.resolve(Modules.PROMOTION)

    const [group] = await customerService.listCustomerGroups(
      { name: TRADER_GROUP_NAME },
      { take: 1 }
    )

    const groupId =
      group?.id ??
      (await customerService.createCustomerGroups({ name: TRADER_GROUP_NAME }))
        .id

    const [existing] = await promotionService.listPromotions(
      { code: TRADER_PROMOTION_CODE },
      { take: 1 }
    )

    return new StepResponse<PreparedPromotion>({
      group_id: groupId,
      exists: Boolean(existing),
    })
  }
)

/**
 * Creates the automatic 10% trader discount if it is not already present.
 *
 * Safe to run repeatedly - it is a no-op once the promotion exists, so it can
 * be called on boot or from a script without duplicating the discount.
 */
export const ensureTraderPromotionWorkflow = createWorkflow(
  "ensure-trader-promotion",
  () => {
    const prepared = prepareTraderPromotionStep()

    const promotionsData = transform({ prepared }, ({ prepared }) => {
      if (prepared.exists) {
        return { promotionsData: [] }
      }

      return {
        promotionsData: [
          {
            code: TRADER_PROMOTION_CODE,
            // `is_automatic` is what makes this apply with no coupon code: the
            // shopper never types anything, the cart picks it up from their
            // customer group.
            is_automatic: true,
            type: PromotionType.STANDARD,
            status: PromotionStatus.ACTIVE,
            application_method: {
              type: ApplicationMethodType.PERCENTAGE,
              // A real percentage, evaluated at checkout - this is the whole
              // reason the price list was dropped. Nothing to re-sync when
              // base prices change or products are added.
              value: TRADER_DISCOUNT_RATE * 100,
              currency_code: "eur",
              target_type: ApplicationMethodTargetType.ITEMS,
              // ACROSS rather than EACH: Medusa requires a `max_quantity` with
              // EACH, which would cap how many units per line are discounted.
              // The trader discount is unlimited, and for a PERCENTAGE the two
              // allocations compute the same figure anyway - 10% of the item
              // subtotal, spread over the lines.
              allocation: ApplicationMethodAllocation.ACROSS,
              // Empty target_rules means every item qualifies.
              target_rules: [],
            },
            rules: [
              {
                attribute: "customer.groups.id",
                operator: PromotionRuleOperator.IN,
                values: [prepared.group_id],
              },
            ],
          },
        ],
      }
    })

    const promotions = createPromotionsWorkflow.runAsStep({
      input: promotionsData,
    })

    return new WorkflowResponse(
      transform({ prepared, promotions }, ({ prepared, promotions }) => ({
        created: !prepared.exists,
        promotion_id: promotions?.[0]?.id ?? null,
      }))
    )
  }
)
