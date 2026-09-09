import { IconSpinner } from "@modules/common/icons"

export default function Loading() {
  return (
    <div className="flex size-full items-center justify-center text-text">
      <IconSpinner size={36} />
    </div>
  )
}
