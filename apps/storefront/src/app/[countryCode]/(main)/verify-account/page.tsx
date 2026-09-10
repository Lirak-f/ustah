import { Metadata } from "next"
import { Suspense } from "react"

import VerifyAccount from "@modules/account/components/verify-account"

export const metadata: Metadata = {
  title: "Verifiko email-in",
  description:
    "Verifiko adresën tënde të email-it për të përfunduar regjistrimin.",
}

export default function VerifyAccountPage() {
  return (
    <div className="flex w-full justify-center px-6 py-9 small:py-12">
      <Suspense
        fallback={
          <p className="text-small text-muted">Duke verifikuar email-in…</p>
        }
      >
        <VerifyAccount />
      </Suspense>
    </div>
  )
}
