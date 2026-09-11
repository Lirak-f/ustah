import { Checkbox, Label } from "@modules/common/components/ui"
import { cn } from "@lib/util/cn"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  /**
   * Visually locks the checkbox (forced checked, clicks ignored) without
   * using the HTML `disabled` attribute - a disabled checkbox is dropped
   * from FormData on submit, unlike a readOnly text input, which would
   * silently break server actions that read this field by name.
   */
  locked?: boolean
  "data-testid"?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  locked = false,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className={cn(
          "flex items-center gap-x-2 text-small",
          locked && "pointer-events-none opacity-50 select-none",
        )}
        id="checkbox"
        role="checkbox"
        checked={locked ? true : checked}
        readOnly
        aria-checked={locked ? true : checked}
        onClick={locked ? undefined : onChange}
        name={name}
        data-testid={dataTestId}
      />
      <Label htmlFor="checkbox" className="transform-none! text-small!">
        {label}
      </Label>
    </div>
  )
}

export default CheckboxWithLabel
