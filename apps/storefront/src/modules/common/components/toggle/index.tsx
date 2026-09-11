"use client"

import { Switch } from "@headlessui/react"
import { Label } from "@modules/common/components/ui"
import { cn } from "@lib/util/cn"
import React from "react"

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  name?: string
  "data-testid"?: string
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  name,
  "data-testid": dataTestId,
}) => {
  return (
    <div className="flex items-center gap-x-4">
      <Switch
        checked={checked}
        onChange={onChange}
        name={name}
        id={name}
        data-testid={dataTestId}
        className={cn(
          "relative inline-flex h-6 w-9.5 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-accent" : "bg-border-strong",
        )}
      >
        <span
          className={cn(
            "inline-block size-4 shrink-0 transform rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-8" : "translate-x-1",
          )}
        />
      </Switch>
      <div className="flex min-w-0 flex-col">
        <Label htmlFor={name} className="text-small">
          {label}
        </Label>
        {description && (
          <span className="text-xs text-muted">{description}</span>
        )}
      </div>
    </div>
  )
}

export default Toggle
