import { Disclosure, DisclosurePanel } from "@headlessui/react"
import { Badge, Button, clx } from "@modules/common/components/ui"
import { useEffect, useState } from "react"

import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  readOnly?: boolean
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Ndodhi një gabim, provo përsëri",
  children,
  readOnly = false,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { pending } = useFormStatus()

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      event.currentTarget.form?.reset()
    }
    clearState()
    setShowSuccess(false)
    setIsOpen((open) => !open)
  }

  useEffect(() => {
    if (isSuccess && isOpen) {
      setIsOpen(false)
      setShowSuccess(true)
    }
  }, [isSuccess, isOpen])

  return (
    <div className="text-small" data-testid={dataTestid}>
      <div className="flex items-end justify-between gap-x-4">
        {!isOpen && (
          <div className="flex flex-col gap-y-1">
            <span className="text-xs text-muted uppercase">{label}</span>
            <div className="flex flex-1 basis-0 items-center gap-x-4">
              {typeof currentInfo === "string" ? (
                <span className="font-semibold" data-testid="current-info">
                  {currentInfo}
                </span>
              ) : (
                currentInfo
              )}
            </div>
          </div>
        )}
        {isOpen && (
          <span className="text-xs text-muted uppercase">{label}</span>
        )}
        {!readOnly && (
          <div className="ml-auto">
            <Button
              variant="secondary"
              className="min-h-[25px] w-[100px] py-1"
              onClick={handleToggle}
              type="button"
              data-testid="edit-button"
              data-active={isOpen}
            >
              {isOpen ? "Anulo" : "Ndrysho"}
            </Button>
          </div>
        )}
      </div>

      {!readOnly && (
        <>
          {/* Success state */}
          <Disclosure>
            <DisclosurePanel
              static
              className={clx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                {
                  "max-h-[1000px] opacity-100": showSuccess,
                  "max-h-0 opacity-0": !showSuccess,
                },
              )}
              data-testid="success-message"
            >
              <Badge className="my-4 p-2" color="green">
                <span>{label} u përditësua me sukses</span>
              </Badge>
            </DisclosurePanel>
          </Disclosure>

          {/* Error state  */}
          <Disclosure>
            <DisclosurePanel
              static
              className={clx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                {
                  "max-h-[1000px] opacity-100": isError,
                  "max-h-0 opacity-0": !isError,
                },
              )}
              data-testid="error-message"
            >
              <Badge className="my-4 p-2" color="red">
                <span>{errorMessage}</span>
              </Badge>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure>
            <DisclosurePanel
              static
              className={clx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
                {
                  "max-h-[1000px] opacity-100": isOpen,
                  "max-h-0 opacity-0": !isOpen,
                },
              )}
            >
              <div className="flex flex-col gap-y-2 py-4">
                <div>{children}</div>
                <div className="mt-2 flex items-center justify-end">
                  <Button
                    isLoading={pending}
                    className="w-full small:max-w-[140px]"
                    type="submit"
                    data-testid="save-button"
                  >
                    Ruaj ndryshimet
                  </Button>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </>
      )}
    </div>
  )
}

export default AccountInfo
