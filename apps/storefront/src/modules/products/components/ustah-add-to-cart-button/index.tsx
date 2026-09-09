"use client"

import { HttpTypes } from "@medusajs/types"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { addToCart } from "@lib/data/cart"
import { cn } from "@lib/util/cn"
import { getStockState } from "@lib/util/ustah-stock"
import { selectLeadVariant } from "@lib/util/ustah-variant"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { buttonVariants } from "@modules/common/components/ustah"
import { IconSpinner } from "@modules/common/icons"

type Props = {
  product: HttpTypes.StoreProduct
  className?: string
}

/**
 * Add-to-cart on a product card.
 *
 * Not in the design — the design only puts the full button in the buy box —
 * so it borrows the buy box's own rules rather than inventing new ones: the
 * lead variant is the one the card prices, and an out-of-stock card cannot be
 * added.
 *
 * It deliberately does NOT add when the product has a real variant choice.
 * A card shows one price but the shopper has not picked a size, voltage or
 * pack, and silently adding the lead variant puts the wrong item in the cart —
 * the failure is invisible until checkout. Those cards send the shopper to the
 * product page to choose, which is why the label changes with them.
 */
const UstahAddToCartButton = ({ product, className }: Props) => {
  const router = useRouter()
  const countryCode = useParams().countryCode as string

  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const lead = selectLeadVariant(product)
  const stock = getStockState(lead?.variant)

  // More than one purchasable variant means the choice is real and belongs on
  // the product page. A single-variant product has nothing to choose.
  const needsChoice = (product.variants?.length ?? 0) > 1
  const isOut = stock.level === "out"

  const handleAdd = async () => {
    if (!lead?.variant.id || isAdding) {
      return
    }
    setIsAdding(true)
    try {
      await addToCart({
        variantId: lead.variant.id,
        quantity: 1,
        countryCode,
      })
      setAdded(true)
      // The cart chip in the header is server-rendered, so it will not show the
      // new count until the route re-renders.
      router.refresh()
    } finally {
      setIsAdding(false)
    }
  }

  if (!lead || isOut) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          buttonVariants({ variant: "accent", size: "sm" }),
          "w-full",
          className,
        )}
      >
        Nuk ka në stok
      </button>
    )
  }

  if (needsChoice) {
    return (
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "w-full",
          className,
        )}
      >
        Zgjidh opsionin
      </LocalizedClientLink>
    )
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding}
      aria-live="polite"
      className={cn(
        buttonVariants({ variant: "accent", size: "sm" }),
        "w-full gap-3",
        className,
      )}
    >
      {isAdding ? (
        <>
          <IconSpinner className="size-4" />
          Duke shtuar…
        </>
      ) : added ? (
        "Shtuar ✓"
      ) : (
        "Shto"
      )}
    </button>
  )
}

export default UstahAddToCartButton
