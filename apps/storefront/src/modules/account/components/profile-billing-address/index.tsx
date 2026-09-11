"use client"

import React, { useActionState, useEffect, useMemo } from "react"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import { upsertCustomerBillingAddress } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing,
  )

  const initialState: Record<string, unknown> = {
    error: false,
    success: false,
  }

  const [state, formAction] = useActionState(
    upsertCustomerBillingAddress,
    initialState,
  )

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(!!state.success)
  }, [state])

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return "Asnjë adresë faturimi"
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code,
      )?.label || billingAddress.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>{billingAddress.company}</span>
        <span>
          {billingAddress.address_1}
          {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
        </span>
        <span>{billingAddress.city}</span>
        <span>{country}</span>
      </div>
    )
  }, [billingAddress, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" defaultValue={billingAddress?.id} />
      <AccountInfo
        label="Adresa e faturimit"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-6">
          <input
            type="hidden"
            name="first_name"
            value={customer.first_name ?? ""}
          />
          <input
            type="hidden"
            name="last_name"
            value={customer.last_name ?? ""}
          />

          <div className="col-span-2">
            <Input
              label="Kompania"
              name="company"
              autoComplete="organization"
              defaultValue={billingAddress?.company || undefined}
              data-testid="billing-company-input"
            />
          </div>
          <NativeSelect
            name="country_code"
            autoComplete="country"
            defaultValue={billingAddress?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
          >
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              )
            })}
          </NativeSelect>
          <Input
            label="Qyteti"
            name="city"
            autoComplete="address-level2"
            defaultValue={billingAddress?.city || undefined}
            required
            data-testid="billing-city-input"
          />
          <Input
            label="Shteti / Rajoni"
            name="province"
            autoComplete="address-level1"
            defaultValue={billingAddress?.province || undefined}
            data-testid="billing-province-input"
          />
          <Input
            label="Adresa"
            name="address_1"
            autoComplete="address-line1"
            defaultValue={billingAddress?.address_1 || undefined}
            required
            data-testid="billing-address-1-input"
          />
          <input
            type="hidden"
            name="phone"
            value={billingAddress?.phone ?? customer.phone ?? ""}
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileBillingAddress
