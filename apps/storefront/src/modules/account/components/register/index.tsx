"use client"

import { useActionState, useState } from "react"
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
  const [accountType, setAccountType] = useState<"standard" | "trader">(
    "standard",
  )

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
            label="Email-i"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefoni"
            name="phone"
            required
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

        <fieldset className="mt-6 flex flex-col gap-3">
          <legend className="mb-2 text-small font-semibold text-text">
            Lloji i llogarisë
          </legend>
          {(
            [
              {
                value: "standard",
                label: "Llogari normale",
              },
              {
                value: "trader",
                label: "Llogari tregtari/instaluesi",
              },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              htmlFor={`account-type-${option.value}`}
              className="flex cursor-pointer items-start gap-3 border border-divider p-4 has-checked:border-accent"
            >
              <input
                id={`account-type-${option.value}`}
                type="radio"
                name="account_type"
                value={option.value}
                checked={accountType === option.value}
                onChange={() => setAccountType(option.value)}
                className="mt-1 accent-accent"
                data-testid={`account-type-${option.value}`}
              />
              <span className="flex flex-col">
                <span className="text-small font-semibold text-text">
                  {option.label}
                </span>
              </span>
            </label>
          ))}
        </fieldset>

        {accountType === "trader" && (
          <div className="mt-4 flex flex-col gap-2">
            <Input
              label="Numri i biznesit (NUIS)"
              name="business_number"
              required
              autoComplete="off"
              data-testid="business-number-input"
            />
            <p className="text-small text-muted">
              Do të të kontaktojmë në numrin e telefonit për ta verifikuar
              biznesin.
            </p>
          </div>
        )}
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
