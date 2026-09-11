import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div
        className={`content-container mx-auto flex h-full flex-1 flex-col bg-white`}
      >
        <div
          className={
            customer
              ? "grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]"
              : "py-12 small:py-16"
          }
        >
          {customer && (
            <div>
              <AccountNav customer={customer} />
            </div>
          )}
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-divider py-12 small:flex-row small:items-end small:gap-8">
          <div>
            <h3 className="mb-4 font-heading text-page-title font-semibold uppercase">
              Ke pyetje?
            </h3>
            <span className="text-small text-muted">
              Pyetjet e bëra shpesh dhe përgjigjet i gjen në faqen tonë të
              shërbimit ndaj klientit.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              Shërbimi ndaj klientit
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
