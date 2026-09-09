"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { buttonVariants } from "@modules/common/components/ustah"
import { useCallback, useMemo } from "react"

import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"

/** One filterable axis, already scoped to the products on this page. */
export type FilterGroup = {
  id: string
  title: string
  values: { id: string; value: string }[]
}

/**
 * Filter sidebar.
 *
 * Filtering runs entirely through the URL (the `optionValueIds` params the
 * server components already read), so a filtered catalog page is shareable and
 * survives a reload — which matters when a builder sends a colleague a link to
 * "the 18 V ones".
 */
const UstahFilters = ({ groups }: { groups: FilterGroup[] }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selected = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams],
  )

  const apply = useCallback(
    (valueIds: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(OPTION_VALUE_QUERY_KEY)
      valueIds.forEach((id) => params.append(OPTION_VALUE_QUERY_KEY, id))
      params.delete("page")
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [pathname, router, searchParams],
  )

  const toggle = (valueId: string) =>
    apply(
      selected.includes(valueId)
        ? selected.filter((id) => id !== valueId)
        : [...selected, valueId],
    )

  if (!groups.length) {
    return null
  }

  const selectedLabels = groups
    .flatMap((g) => g.values)
    .filter((v) => selected.includes(v.id))

  return (
    <aside className="w-full shrink-0 bg-surface lg:w-[264px]">
      <div className="flex items-baseline justify-between border-b border-divider px-6 py-5">
        <h2 className="font-heading text-[15px] font-semibold tracking-wider uppercase">
          Filtra
        </h2>
        {selected.length > 0 && (
          <span className="bg-accent px-2 py-[2px] text-[11px] font-semibold text-white">
            {selected.length}
          </span>
        )}
      </div>

      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-divider px-6 py-4">
          {selectedLabels.map((v) => (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              className={buttonVariants({
                variant: "outline",
                size: "chip",
                className: "gap-2",
              })}
            >
              {v.value}
              <span aria-hidden>×</span>
              <span className="sr-only">Hiq filtrin</span>
            </button>
          ))}
          <button
            onClick={() => apply([])}
            className={buttonVariants({ variant: "link", size: "text" })}
          >
            Fshij të gjitha
          </button>
        </div>
      )}

      {groups.map((group) => (
        <fieldset key={group.id} className="border-b border-divider px-6 py-5">
          <legend className="mb-4 font-heading text-section-label font-semibold uppercase">
            {group.title}
          </legend>
          <div className="flex flex-col gap-3">
            {group.values.map((value: { id: string; value: string }) => (
              <label
                key={value.id}
                className="flex cursor-pointer items-center gap-3 text-[13px]"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(value.id)}
                  onChange={() => toggle(value.id)}
                  className="size-4 shrink-0 accent-(--color-accent)"
                />
                {value.value}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      {/* Trade pitch — part of the design, and the reason the sidebar exists. */}
      <div className="p-6">
        <h3 className="mb-2 font-heading text-section-label font-semibold uppercase">
          Çmime për tregtarë
        </h3>
        <p className="text-[12px] leading-[1.45] text-muted-deep">
          Zbritje 5–12% për sasi, faturë me TVSH, kredi 30 ditë pas verifikimit.
        </p>
      </div>
    </aside>
  )
}

export default UstahFilters
