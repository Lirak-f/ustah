"use client"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { IconCheckCircle } from "@modules/common/icons"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text } from "@modules/common/components/ui"
import { IconSpinner } from "@modules/common/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true,
  )

  const savedBillingAddress = customer?.addresses?.find(
    (a) => a.is_default_billing,
  )
  const hasSavedInfo = !!(
    customer?.first_name &&
    customer?.last_name &&
    savedBillingAddress
  )

  const { state: useSavedInfo, toggle: toggleSavedInfo } =
    useToggleState(hasSavedInfo)

  const effectiveSameAsBilling = useSavedInfo || sameAsBilling

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className="flex flex-row items-baseline gap-x-2 text-page-title"
        >
          Adresa e dërgesës
          {!isOpen && <IconCheckCircle />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-accent hover:text-accent-600"
              data-testid="edit-address-button"
            >
              Ndrysho
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
              useSavedInfo={useSavedInfo}
              onSavedInfoChange={toggleSavedInfo}
            />

            {!effectiveSameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="gap-x-4 pt-8 pb-6 text-page-title"
                >
                  Adresa e faturimit
                </Heading>

                <BillingAddress
                  cart={cart}
                  customer={customer}
                  useSavedInfo={useSavedInfo}
                />
              </div>
            )}
            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Vazhdo te dërgesa
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-xs">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full items-start gap-x-1">
                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="mb-1 text-small font-semibold text-text">
                      Adresa e dërgesës
                    </Text>
                    <Text className="text-small text-muted">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-small text-muted">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-small text-muted">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-small text-muted">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="mb-1 text-small font-semibold text-text">
                      Kontakti
                    </Text>
                    <Text className="text-small text-muted">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-small text-muted">{cart.email}</Text>
                  </div>

                  <div
                    className="flex w-1/3 flex-col"
                    data-testid="billing-address-summary"
                  >
                    <Text className="mb-1 text-small font-semibold text-text">
                      Adresa e faturimit
                    </Text>

                    {effectiveSameAsBilling ? (
                      <Text className="text-small text-muted">
                        Adresa e faturimit dhe e dërgesës janë të njëjta.
                      </Text>
                    ) : (
                      <>
                        <Text className="text-small text-muted">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-small text-muted">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-small text-muted">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-small text-muted">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <IconSpinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
