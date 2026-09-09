import { Container, Heading, Text } from "@modules/common/components/ui"

import { paymentInfoMap } from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <Heading level="h2" className="my-6 flex flex-row text-page-title">
        Payment
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <Text className="mb-1 text-small font-semibold text-text">
                Payment method
              </Text>
              <Text
                className="text-small text-muted"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id]?.title ??
                  payment.provider_id}
              </Text>
            </div>
            <div className="flex w-2/3 flex-col">
              <Text className="mb-1 text-small font-semibold text-text">
                Payment details
              </Text>
              <div className="flex items-center gap-2 text-small text-muted">
                <Container className="flex h-7 w-fit items-center bg-surface-alt p-2">
                  {paymentInfoMap[payment.provider_id]?.icon}
                </Container>
                <Text data-testid="payment-amount">
                  {`${convertToLocale({
                    amount: payment.amount,
                    currency_code: order.currency_code,
                  })} due on delivery`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails
