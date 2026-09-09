"use client"
import { createTransferRequest } from "@lib/data/orders"
import { IconCheckCircle, IconXCircle } from "@modules/common/icons"
import { Heading, IconButton, Input, Text } from "@modules/common/components/ui"
import { useActionState } from "react"
// TODO: Re-add Toaster component when needed
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="grid w-full items-center gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col gap-y-1">
          <Heading
            level="h3"
            className="text-sm! font-semibold text-neutral-950"
          >
            Order transfers
          </Heading>
          <p className="text-xs text-neutral-500">
            Can&apos;t find the order you are looking for?
            <br /> Connect an order to your account.
          </p>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex w-full flex-col gap-y-2">
            <Input className="w-full" name="order_id" placeholder="Order ID" />
            <SubmitButton
              variant="secondary"
              size="small"
              className="w-fit self-end whitespace-nowrap"
            >
              Request transfer
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-right text-small text-rose-500">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex w-full items-center justify-between self-stretch border border-divider bg-neutral-50 p-4">
          <div className="flex items-center gap-x-2">
            <IconCheckCircle className="size-4 text-emerald-500" />
            <div className="flex flex-col gap-y-1">
              <Text className="text-neutral-950">
                Transfer for order {state.order?.id} requested
              </Text>
              <Text className="text-small text-neutral-600">
                Transfer request email sent to {state.order?.email}
              </Text>
            </div>
          </div>
          <IconButton className="h-fit" onClick={() => setShowSuccess(false)}>
            <IconXCircle className="size-4 text-neutral-500" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
