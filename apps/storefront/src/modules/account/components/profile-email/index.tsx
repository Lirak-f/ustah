"use client"

import React from "react"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

// Email is tied to the customer's auth identity (login credential), so it
// can't be changed via a plain customer update without desyncing login.
// Changing it requires its own verify-then-update flow, which isn't built
// yet — shown as read-only until that exists.
const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  return (
    <AccountInfo
      label="Email-i"
      currentInfo={`${customer.email}`}
      readOnly
      clearState={() => {}}
      data-testid="account-email-editor"
    />
  )
}

export default ProfileEmail
