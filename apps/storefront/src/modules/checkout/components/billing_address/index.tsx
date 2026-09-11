import { HttpTypes } from "@medusajs/types"
import Input from "@modules/common/components/input"
import { cn } from "@lib/util/cn"
import React, { useEffect, useMemo, useRef, useState } from "react"
import CountrySelect from "../country-select"

const BillingAddress = ({
  cart,
  customer,
  useSavedInfo,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  useSavedInfo: boolean
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    "billing_address.first_name": cart?.billing_address?.first_name || "",
    "billing_address.last_name": cart?.billing_address?.last_name || "",
    "billing_address.address_1": cart?.billing_address?.address_1 || "",
    "billing_address.company": cart?.billing_address?.company || "",
    "billing_address.postal_code": cart?.billing_address?.postal_code || "",
    "billing_address.city": cart?.billing_address?.city || "",
    "billing_address.country_code": cart?.billing_address?.country_code || "",
    "billing_address.province": cart?.billing_address?.province || "",
    "billing_address.phone": cart?.billing_address?.phone || "",
  })

  const savedBillingAddress = useMemo(
    () => customer?.addresses?.find((a) => a.is_default_billing),
    [customer?.addresses],
  )

  const savedInfoFormData = useMemo(
    () => ({
      "billing_address.first_name": customer?.first_name || "",
      "billing_address.last_name": customer?.last_name || "",
      "billing_address.address_1": savedBillingAddress?.address_1 || "",
      "billing_address.company": savedBillingAddress?.company || "",
      "billing_address.postal_code": savedBillingAddress?.postal_code || "",
      "billing_address.city": savedBillingAddress?.city || "",
      "billing_address.country_code": savedBillingAddress?.country_code || "",
      "billing_address.province": savedBillingAddress?.province || "",
      "billing_address.phone":
        customer?.phone || savedBillingAddress?.phone || "",
    }),
    [customer, savedBillingAddress],
  )

  const prevUseSavedInfo = useRef(useSavedInfo)
  useEffect(() => {
    if (useSavedInfo && !prevUseSavedInfo.current) {
      setFormData((prev) => ({ ...prev, ...savedInfoFormData }))
    }
    prevUseSavedInfo.current = useSavedInfo
  }, [useSavedInfo, savedInfoFormData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const lockedInputClassName = useSavedInfo
    ? "bg-surface text-muted cursor-not-allowed"
    : undefined

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-6">
        <Input
          label="Emri"
          name="billing_address.first_name"
          autoComplete="given-name"
          value={formData["billing_address.first_name"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="billing-first-name-input"
        />
        <Input
          label="Mbiemri"
          name="billing_address.last_name"
          autoComplete="family-name"
          value={formData["billing_address.last_name"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="billing-last-name-input"
        />
        <div className="col-span-2">
          <Input
            label="Adresa"
            name="billing_address.address_1"
            autoComplete="address-line1"
            value={formData["billing_address.address_1"]}
            onChange={handleChange}
            readOnly={useSavedInfo}
            className={lockedInputClassName}
            required
            data-testid="billing-address-input"
          />
        </div>
        <div className="col-span-2">
          <Input
            label="Kompania"
            name="billing_address.company"
            value={formData["billing_address.company"]}
            onChange={handleChange}
            readOnly={useSavedInfo}
            className={lockedInputClassName}
            autoComplete="organization"
            data-testid="billing-company-input"
          />
        </div>
        <Input
          label="Kodi postar"
          name="billing_address.postal_code"
          autoComplete="postal-code"
          value={formData["billing_address.postal_code"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="billing-postal-input"
        />
        <Input
          label="Qyteti"
          name="billing_address.city"
          autoComplete="address-level2"
          value={formData["billing_address.city"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
        />
        <CountrySelect
          label="Shteti"
          name="billing_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["billing_address.country_code"]}
          onChange={useSavedInfo ? () => {} : handleChange}
          className={cn(
            useSavedInfo && "pointer-events-none opacity-60 select-none",
          )}
          tabIndex={useSavedInfo ? -1 : undefined}
          required
          data-testid="billing-country-select"
        />
        <Input
          label="Shteti / Rajoni"
          name="billing_address.province"
          autoComplete="address-level1"
          value={formData["billing_address.province"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          data-testid="billing-province-input"
        />
        <div className="col-span-2">
          <Input
            label="Telefoni"
            name="billing_address.phone"
            autoComplete="tel"
            value={formData["billing_address.phone"]}
            onChange={handleChange}
            readOnly={useSavedInfo}
            className={lockedInputClassName}
            data-testid="billing-phone-input"
          />
        </div>
      </div>
    </>
  )
}

export default BillingAddress
