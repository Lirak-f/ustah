import { IconChevronUpDown } from "@modules/common/icons"
import { clx, Label } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  label?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = "Select...",
      label,
      name,
      required,
      defaultValue,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <Label htmlFor={name} className="text-small text-muted">
            {label}
            {required && <span className="text-danger"> *</span>}
          </Label>
        )}
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex h-11 items-center border border-divider bg-bg text-small focus-within:border-accent",
            className,
            {
              "text-faint": isPlaceholder,
            },
          )}
        >
          <select
            id={name}
            name={name}
            required={required}
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="flex-1 appearance-none border-none bg-transparent px-4 outline-hidden transition-colors duration-150"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <IconChevronUpDown />
          </span>
        </div>
      </div>
    )
  },
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
