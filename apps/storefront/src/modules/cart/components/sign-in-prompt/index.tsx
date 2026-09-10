import { Button } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-divider bg-surface p-6">
      <div>
        <h2 className="font-heading text-card-title font-semibold">
          Ke tashmë një llogari?
        </h2>
        <p className="mt-1 text-small text-muted">
          Hyr për një përvojë më të mirë dhe porosi më të shpejta.
        </p>
      </div>
      <LocalizedClientLink href="/account">
        <Button variant="secondary" size="small" data-testid="sign-in-button">
          Hyr
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
