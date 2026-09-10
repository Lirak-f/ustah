"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="flex w-full max-w-sm flex-col" data-testid="register-page">
      <h1 className="font-heading text-page-title font-semibold uppercase">
        Krijo llogari
      </h1>
      <p className="mt-2 text-small text-muted">
        Regjistrohu për një përvojë më të mirë blerjeje dhe porosi më të
        shpejta.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="mt-6 border border-divider bg-surface p-4 text-small text-muted"
          data-testid="register-verification-message"
        >
          Dërguam një lidhje verifikimi te{" "}
          <strong className="font-semibold text-text">{message.email}</strong>.
          Kontrollo email-in për ta verifikuar, pastaj hyr.
        </div>
      )}
      <form className="mt-8 flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Emri"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Mbiemri"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefoni"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Fjalëkalimi"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />
        <span className="mt-6 text-small text-muted">
          Duke krijuar një llogari, pranon{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-accent underline hover:text-accent-600"
          >
            Politikën e Privatësisë
          </LocalizedClientLink>{" "}
          dhe{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-accent underline hover:text-accent-600"
          >
            Kushtet e Përdorimit
          </LocalizedClientLink>{" "}
          e Ustah.
        </span>
        <SubmitButton className="mt-6 w-full" data-testid="register-button">
          Regjistrohu
        </SubmitButton>
      </form>
      <span className="mt-6 text-small text-muted">
        Ke tashmë një llogari?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-accent underline hover:text-accent-600"
        >
          Hyr
        </button>
      </span>
    </div>
  )
}

export default Register
