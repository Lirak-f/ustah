"use client"

import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { addToCart } from "@lib/data/cart"
import {
  formatEur,
  formatExVat,
  productMeta,
  discountPercent,
} from "@lib/util/ustah-price"
import { getStockState } from "@lib/util/ustah-stock"
import { selectLeadVariant } from "@lib/util/ustah-variant"
import { HttpTypes } from "@medusajs/types"
import { buttonVariants, StockLine } from "@modules/common/components/ustah"
import { commerce } from "@ustah/design-tokens"

type Props = {
  product: HttpTypes.StoreProduct
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"],
) =>
  variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})

/**
 * Product buy box.
 *
 * Carries the variant picker, price with its ex-VAT line, stock,
 * delivery, quantity and add-to-cart. The quantity price-break table is
 * indicative: no price list backs it, so the cart charges the unit price at
 * every quantity, and the box says so rather than implying an automatic
 * discount.
 */
const UstahBuyBox = ({ product, disabled }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const countryCode = useParams().countryCode as string

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  // Preselect a variant rather than opening on an empty selection. With nothing
  // chosen there is no price and no stock to report, and the box would claim
  // "Nuk ka në stok" for a product that is in stock — the shopper reads that as
  // unavailable and leaves. The discounted variant leads when there is an
  // offer, matching the card they clicked through from; otherwise the cheapest.
  const variants = product.variants

  useEffect(() => {
    const initial = selectLeadVariant({ variants })?.variant ?? variants?.[0]
    if (initial) {
      setOptions(optionsAsKeymap(initial.options) ?? {})
    }
  }, [variants])

  const selectedVariant = useMemo(
    () =>
      product.variants?.find((v) =>
        isEqual(optionsAsKeymap(v.options), options),
      ),
    [product.variants, options],
  )

  // Keep the variant in the URL so a shared link opens on the same variant.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = selectedVariant?.id ?? null
    if (params.get("v_id") === value) {
      return
    }
    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }
    router.replace(`${pathname}?${params.toString()}`)
    // Re-running on every searchParams change would fight the user's own
    // navigation; the selected variant is the only trigger that matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant?.id])

  const price = (
    selectedVariant as
      | (HttpTypes.StoreProductVariant & {
          calculated_price?: { calculated_amount: number }
        })
      | undefined
  )?.calculated_price?.calculated_amount

  const { compareAt } = productMeta(selectedVariant?.metadata)
  const discount =
    typeof price === "number"
      ? discountPercent(price, compareAt ?? undefined)
      : null
  const stock = getStockState(selectedVariant)
  const canAdd =
    !!selectedVariant && stock.level !== "out" && !disabled && !isAdding

  const handleAdd = async () => {
    if (!selectedVariant?.id) {
      return
    }
    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
      setAdded(true)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="border border-border-strong bg-bg">
      {(product.options?.length ?? 0) > 0 &&
        (product.variants?.length ?? 0) > 1 && (
          <div className="border-b border-divider p-6">
            {(product.options ?? []).map((option) => (
              <fieldset key={option.id} className="mb-5 last:mb-0">
                <legend className="mb-3 font-heading text-section-label font-semibold uppercase">
                  {option.title}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {(option.values ?? []).map((value) => {
                    const isSelected = options[option.id] === value.value
                    return (
                      <button
                        key={value.id}
                        type="button"
                        onClick={() =>
                          setOptions((prev) => ({
                            ...prev,
                            [option.id]: value.value,
                          }))
                        }
                        aria-pressed={isSelected}
                        className={buttonVariants({
                          variant: isSelected ? "selected" : "outline",
                          size: "option",
                        })}
                      >
                        {value.value}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        )}

      <div className="p-6">
        {typeof price === "number" ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-price-lg font-bold">
                {formatEur(price)}
              </span>
              {discount && compareAt && (
                <span className="bg-yellow px-2 py-1 text-[12px] font-bold">
                  {discount}
                </span>
              )}
            </div>
            {discount && compareAt && (
              <div className="mt-1 text-[13px] text-muted-deep">
                <s>{formatEur(compareAt)}</s>
              </div>
            )}
            <p className="mt-2 text-[11px] text-muted-deep">
              pa TVSH {formatExVat(price)}
            </p>
            <p className="mt-1 text-[11px] text-muted-deep">
              Çmimi për copë · TVSH {Math.round(commerce.vatRate * 100)}% e
              përfshirë
            </p>
          </>
        ) : (
          <p className="text-[13px] text-muted">
            Zgjidh një variant për të parë çmimin.
          </p>
        )}

        <StockLine stock={stock} className="mt-5 text-[13px]" />
        <p className="mt-1 text-[11px] text-muted-deep">
          Prishtinë 1–2 ditë · Tiranë 2–3 ditë · Porosit deri 15:00 — niset të
          njëjtën ditë
        </p>

        <div className="mt-6 flex gap-3">
          <label className="sr-only" htmlFor="ustah-qty">
            Sasia
          </label>
          <input
            id="ustah-qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="h-[46px] w-[70px] border border-border-strong bg-bg text-center font-semibold outline-none focus-visible:border-accent"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            data-testid="add-product-button"
            className={buttonVariants({
              variant: "accent",
              size: "md",
              className: "flex-1",
            })}
          >
            {isAdding ? "Duke shtuar…" : added ? "Shtuar ✓" : "Shto në shportë"}
          </button>
        </div>

        {typeof price === "number" && (
          <table className="mt-6 w-full text-[12px]">
            <caption className="mb-2 text-left font-heading text-section-label font-semibold uppercase">
              Çmime për sasi
            </caption>
            <tbody>
              {commerce.quantityBreaks.map((tier) => (
                <tr key={tier.min} className="odd:bg-surface">
                  <td className="px-3 py-2">
                    {tier.max ? `${tier.min}–${tier.max}` : `${tier.min}+`} copë{" "}
                    {tier.discount > 0 && (
                      <span className="text-faint">
                        −{Math.round(tier.discount * 100)}%
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {formatEur(price * (1 - tier.discount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* The tiers above are not applied at checkout — say so plainly. */}
        <p className="mt-2 text-[11px] text-muted-deep">
          Çmimet për sasi janë orientuese dhe konfirmohen me llogari tregtari.
          Porosit me telefon:{" "}
          <a href="tel:038700700" className="text-accent">
            038 700 700
          </a>
          .
        </p>

        <ul className="mt-6 flex flex-col gap-2 border-t border-divider pt-5 text-[12px] text-muted-deep">
          <li>Pagesa në dorëzim (cash) — pa pagesë online</li>
          <li>Faturë me TVSH për biznese</li>
          <li>Kthim brenda 14 ditësh, i papërdorur</li>
        </ul>
      </div>
    </div>
  )
}

export default UstahBuyBox
