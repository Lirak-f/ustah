import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminCustomer } from "@medusajs/framework/types"
import { Badge, Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useState } from "react"

type TraderStatus = "pending" | "approved" | "rejected"

const STATUS_LABEL: Record<TraderStatus, string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
}

const STATUS_COLOR: Record<TraderStatus, "orange" | "green" | "red"> = {
  pending: "orange",
  approved: "green",
  rejected: "red",
}

/**
 * Trader approval panel on the customer detail page.
 *
 * Shows the business number submitted at signup so it can be checked over the
 * phone, and turns the decision into one click. Approving adds the customer to
 * the trader group, which is what actually applies the discount.
 */
const CustomerTraderWidget = ({ data }: DetailWidgetProps<AdminCustomer>) => {
  const metadata = (data.metadata ?? {}) as Record<string, unknown>

  const accountType = metadata.account_type
  const businessNumber =
    typeof metadata.business_number === "string"
      ? metadata.business_number
      : null
  const initialStatus = (
    ["pending", "approved", "rejected"].includes(
      metadata.trader_status as string
    )
      ? metadata.trader_status
      : null
  ) as TraderStatus | null

  const [status, setStatus] = useState<TraderStatus | null>(initialStatus)
  const [isSaving, setIsSaving] = useState(false)

  // Customers who never asked to be a trader and were never approved don't
  // need this panel taking up space on the page.
  if (accountType !== "trader" && !status) {
    return null
  }

  const updateStatus = async (next: TraderStatus) => {
    setIsSaving(true)

    try {
      const response = await fetch(
        `/admin/customers/${data.id}/trader-status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: next }),
        }
      )

      if (!response.ok) {
        throw new Error(await response.text())
      }

      setStatus(next)
      toast.success(
        next === "approved"
          ? "Customer approved for trader pricing."
          : "Trader pricing removed for this customer."
      )
    } catch (error) {
      toast.error("Could not update trader status.", {
        description: error instanceof Error ? error.message : undefined,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Trader account</Heading>
        {status && (
          <Badge color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Badge>
        )}
      </div>

      <div className="px-6 py-4">
        <Text size="small" className="text-ui-fg-subtle">
          Business number (NUIS)
        </Text>
        <Text weight="plus">{businessNumber || "Not provided"}</Text>
      </div>

      <div className="flex items-center justify-end gap-2 px-6 py-4">
        {status !== "approved" && (
          <Button
            size="small"
            variant="primary"
            isLoading={isSaving}
            onClick={() => updateStatus("approved")}
          >
            Approve as trader
          </Button>
        )}
        {status === "approved" ? (
          <Button
            size="small"
            variant="secondary"
            isLoading={isSaving}
            onClick={() => updateStatus("rejected")}
          >
            Revoke trader pricing
          </Button>
        ) : (
          status !== "rejected" && (
            <Button
              size="small"
              variant="secondary"
              isLoading={isSaving}
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </Button>
          )
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.details.side",
})

export default CustomerTraderWidget
