import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="bg-page py-12">
      <div className="content-container px-0" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 items-start gap-6 small:grid-cols-[1fr_360px]">
            <div className="flex min-w-0 flex-col border border-border-strong bg-bg">
              {!customer && <SignInPrompt />}
              <ItemsTemplate cart={cart} />
            </div>
            {cart && cart.region && (
              <div className="small:sticky small:top-12">
                <Summary cart={cart} />
              </div>
            )}
          </div>
        ) : (
          <div className="border border-border-strong bg-bg">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
