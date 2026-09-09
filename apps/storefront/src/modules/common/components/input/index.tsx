import { Label } from "@modules/common/components/ui"
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
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, name, label, touched: _touched, required, topLabel, ...props },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

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
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label className="mb-2 text-small font-semibold">{topLabel}</Label>
        )}
        <div className="relative z-0 flex w-full text-small">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="mt-0 block h-11 w-full appearance-none border border-divider bg-surface px-4 pt-4 pb-1 hover:bg-surface-alt focus:border-accent focus:ring-0 focus:outline-hidden"
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="absolute top-3 -z-1 mx-3 flex origin-top-left items-center justify-center px-1 text-muted transition-all duration-300"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-0 px-4 text-muted outline-hidden transition-all duration-150 focus:text-text focus:outline-hidden"
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
