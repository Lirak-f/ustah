"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="flex w-full max-w-sm flex-col" data-testid="login-page">
      <h1 className="font-heading text-page-title font-semibold uppercase">
        Mirë se erdhe
      </h1>
      <p className="mt-2 text-small text-muted">
        Hyr për një përvojë më të mirë blerjeje dhe porosi më të shpejta.
      </p>
      {message?.state === "verification_required" && (
        <div
          className="mt-6 border border-divider bg-surface p-4 text-small text-muted"
          data-testid="login-verification-message"
        >
          Dërguam një lidhje verifikimi te{" "}
          <strong className="font-semibold text-text">{message.email}</strong>.
          Verifiko email-in, pastaj hyr.
        </div>
      )}
      <form className="mt-8 w-full" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email-i"
            name="email"
            type="email"
            title="Shkruaj një adresë email të vlefshme."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Fjalëkalimi"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />
        <SubmitButton data-testid="sign-in-button" className="mt-6 w-full">
          Hyr
        </SubmitButton>
      </form>
      <span className="mt-6 text-small text-muted">
        Nuk ke llogari?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-accent underline hover:text-accent-600"
          data-testid="register-button"
        >
          Regjistrohu
        </button>
      </span>
    </div>
  )
}

export default Login
