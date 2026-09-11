import { Label } from "@modules/common/components/ui"
import { cn } from "@lib/util/cn"
import React, { useEffect, useImperativeHandle, useState } from "react"

import { IconEye } from "@modules/common/icons"
import { IconEyeOff } from "@modules/common/icons"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  "data-testid"?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      errors: _errors,
      touched: _touched,
      required,
      topLabel,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const inputId = id ?? props["data-testid"] ?? name

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex w-full flex-col gap-2">
        {topLabel && (
          <Label className="text-small font-semibold">{topLabel}</Label>
        )}
        <div className="relative flex w-full">
          <input
            id={inputId}
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className={cn(
              "peer h-11 w-full border border-divider bg-bg px-4 text-small text-text placeholder:text-transparent focus:border-accent focus:outline-none",
              type === "password" && "pr-12",
              className,
            )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 px-1 text-small text-muted transition-all duration-200 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:bg-bg peer-not-placeholder-shown:text-xs peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-bg peer-focus:text-xs peer-focus:text-accent"
          >
            {label}
            {required && <span className="text-danger"> *</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-muted transition-colors duration-150 focus:text-text focus:outline-none"
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
