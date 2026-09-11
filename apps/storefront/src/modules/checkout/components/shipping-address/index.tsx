import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import Toggle from "@modules/common/components/toggle"
import { cn } from "@lib/util/cn"
import React, { useEffect, useMemo, useRef, useState } from "react"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
  useSavedInfo,
  onSavedInfoChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
  useSavedInfo: boolean
  onSavedInfoChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const savedBillingAddress = useMemo(
    () => customer?.addresses?.find((a) => a.is_default_billing),
    [customer?.addresses],
  )

  const hasSavedInfo = !!(
    customer?.first_name &&
    customer?.last_name &&
    savedBillingAddress
  )

  const savedInfoFormData = useMemo(
    () => ({
      "shipping_address.first_name": customer?.first_name || "",
      "shipping_address.last_name": customer?.last_name || "",
      "shipping_address.address_1": savedBillingAddress?.address_1 || "",
      "shipping_address.company": savedBillingAddress?.company || "",
      "shipping_address.postal_code": savedBillingAddress?.postal_code || "",
      "shipping_address.city": savedBillingAddress?.city || "",
      "shipping_address.country_code": savedBillingAddress?.country_code || "",
      "shipping_address.province": savedBillingAddress?.province || "",
      "shipping_address.phone":
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

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string,
  ) => {
    if (address) {
      setFormData((prevState: Record<string, string>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))
    }

    if (email) {
      setFormData((prevState: Record<string, string>) => ({
        ...prevState,
        email: email,
      }))
    }
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
    // customer.email is read above, so it belongs here: the customer resolves
    // independently of the cart, and without it an email arriving after the
    // cart never reaches the form.
  }, [cart, customer?.email])

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
      {hasSavedInfo && (
        <Container className="mb-6 p-5">
          <Toggle
            checked={useSavedInfo}
            onChange={onSavedInfoChange}
            label="Përdor informacionin tim të ruajtur"
            description="Emri, telefoni dhe adresa e faturimit të ruajtura në profilin tënd"
            name="use_saved_info"
            data-testid="saved-info-toggle"
          />
        </Container>
      )}
      <div className="grid grid-cols-2 gap-x-5 gap-y-6">
        <Input
          label="Emri"
          name="shipping_address.first_name"
          autoComplete="given-name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="shipping-first-name-input"
        />
        <Input
          label="Mbiemri"
          name="shipping_address.last_name"
          autoComplete="family-name"
          value={formData["shipping_address.last_name"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="shipping-last-name-input"
        />

        <div className="col-span-2">
          <Input
            label="Kompania"
            name="shipping_address.company"
            value={formData["shipping_address.company"]}
            onChange={handleChange}
            readOnly={useSavedInfo}
            className={lockedInputClassName}
            autoComplete="organization"
            data-testid="shipping-company-input"
          />
        </div>
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={useSavedInfo ? () => {} : handleChange}
          className={cn(
            useSavedInfo && "pointer-events-none opacity-60 select-none",
          )}
          tabIndex={useSavedInfo ? -1 : undefined}
          required
          data-testid="shipping-country-select"
        />
        <Input
          label="Qyteti"
          name="shipping_address.city"
          autoComplete="address-level2"
          value={formData["shipping_address.city"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="shipping-city-input"
        />
        <Input
          label="Rajoni"
          name="shipping_address.province"
          autoComplete="address-level1"
          value={formData["shipping_address.province"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          data-testid="shipping-province-input"
        />
        <Input
          label="Adresa"
          name="shipping_address.address_1"
          autoComplete="address-line1"
          value={formData["shipping_address.address_1"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="shipping-address-input"
        />
      </div>
      <div className="my-8">
        <Checkbox
          label="Adresa e faturimit është e njëjta si adresa e dërgesës"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          locked={useSavedInfo}
          data-testid="billing-address-checkbox"
        />
      </div>
      <div className="mb-5 grid grid-cols-2 gap-x-5 gap-y-6">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Shkruaj një adresë email të vlefshme."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          data-testid="shipping-email-input"
        />
        <Input
          label="Telefoni"
          name="shipping_address.phone"
          autoComplete="tel"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          readOnly={useSavedInfo}
          className={lockedInputClassName}
          required
          data-testid="shipping-phone-input"
        />
      </div>
    </>
  )
}

export default ShippingAddress
