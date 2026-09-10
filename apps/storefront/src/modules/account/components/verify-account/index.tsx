"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@modules/common/components/ui"
import { confirmEmailVerification } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type VerificationState = "verifying" | "success" | "error"

const VerifyAccount = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [state, setState] = useState<VerificationState>("verifying")
  // Guard against the effect running twice in React Strict Mode, which would
  // consume the single-use token before the customer sees the result.
  const confirmed = useRef(false)

  useEffect(() => {
    if (confirmed.current) {
      return
    }
    confirmed.current = true

    if (!token) {
      setState("error")
      return
    }

    confirmEmailVerification(token).then(({ success }) =>
      setState(success ? "success" : "error"),
    )
  }, [token])

  return (
    <div
      className="flex w-full max-w-sm flex-col gap-y-4"
      data-testid="verify-account-page"
    >
      <h1 className="font-heading text-page-title font-semibold uppercase">
        Verifikimi i email-it
      </h1>

      {state === "verifying" && (
        <p className="text-small text-muted">Duke verifikuar email-in…</p>
      )}

      {state === "success" && (
        <>
          <p className="text-small text-muted">
            Email-i yt u verifikua. Tani mund të hysh në llogarinë tënde.
          </p>
          <LocalizedClientLink href="/account">
            <Button variant="primary">Shko te hyrja</Button>
          </LocalizedClientLink>
        </>
      )}

      {state === "error" && (
        <>
          <p className="text-small text-muted">
            Kjo lidhje verifikimi është e pavlefshme ose ka skaduar. Hyr për të
            marrë një email të ri verifikimi.
          </p>
          <LocalizedClientLink href="/account">
            <Button variant="secondary">Shko te hyrja</Button>
          </LocalizedClientLink>
        </>
      )}
    </div>
  )
}

export default VerifyAccount
