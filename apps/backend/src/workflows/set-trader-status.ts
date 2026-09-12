import {
  createWorkflow,
  createStep,
  StepResponse,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import {
  linkCustomersToCustomerGroupWorkflow,
  updateCustomersWorkflow,
} from "@medusajs/medusa/core-flows"
import { TRADER_GROUP_NAME, TraderStatus } from "../lib/trader"

type SetTraderStatusInput = {
  customer_id: string
  status: TraderStatus
}

// Resolves the trader group, creating it on first use so a fresh environment
// doesn't need a manual setup step before the first approval.
const resolveTraderGroupStep = createStep(
  "resolve-trader-group",
  async (_, { container }) => {
    const customerService = container.resolve(Modules.CUSTOMER)

    const [existing] = await customerService.listCustomerGroups(
      { name: TRADER_GROUP_NAME },
      { take: 1 }
    )

    if (existing) {
      return new StepResponse({ id: existing.id }, null)
    }

    const created = await customerService.createCustomerGroups({
      name: TRADER_GROUP_NAME,
    })

    // Compensation only removes a group this step actually created.
    return new StepResponse({ id: created.id }, created.id)
  },
  async (createdGroupId, { container }) => {
    if (!createdGroupId) {
      return
    }

    const customerService = container.resolve(Modules.CUSTOMER)
    await customerService.deleteCustomerGroups(createdGroupId)
  }
)

/**
 * Approves or revokes a customer's trader status.
 *
 * Group membership is what actually moves the price, so this is the only
 * supported way to grant the discount. The metadata flag is recorded alongside
 * it for display in the admin, but it is descriptive: a customer whose
 * metadata says "approved" while they are not in the group still pays list
 * price, and this workflow always writes both together.
 */
export const setTraderStatusWorkflow = createWorkflow(
  "set-trader-status",
  (input: SetTraderStatusInput) => {
    const group = resolveTraderGroupStep()

    const membership = transform({ input, group }, ({ input, group }) => ({
      id: group.id,
      add: input.status === "approved" ? [input.customer_id] : [],
      remove: input.status === "approved" ? [] : [input.customer_id],
    }))

    linkCustomersToCustomerGroupWorkflow.runAsStep({ input: membership })

    const customerUpdate = transform({ input }, ({ input }) => ({
      selector: { id: input.customer_id },
      update: {
        metadata: {
          trader_status: input.status,
          // Approval implies the account is a trader account even if the
          // customer never submitted the form (an admin can promote someone
          // who registered normally and phoned in afterwards).
          account_type: input.status === "approved" ? "trader" : "standard",
        },
      },
    }))

    updateCustomersWorkflow.runAsStep({ input: customerUpdate })

    return new WorkflowResponse({ customer_id: input.customer_id })
  }
)
