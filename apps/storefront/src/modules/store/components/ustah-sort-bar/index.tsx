"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { buttonVariants } from "@modules/common/components/ustah"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const OPTIONS: { value: SortOptions; label: string }[] = [
  { value: "created_at", label: "Të reja" },
  { value: "price_asc", label: "Çmimi ↑" },
  { value: "price_desc", label: "Çmimi ↓" },
]

type Props = {
  sortBy: SortOptions
  count: number
}

/** Result count plus sort control, matching the design's row above the grid. */
const UstahSortBar = ({ sortBy, count }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setSort = (value: SortOptions) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-divider px-6 py-4">
      <p className="text-[13px] text-muted-deep">
        <b className="text-text">{count}</b>{" "}
        {count === 1 ? "produkt" : "produkte"} · të gjitha me pagesë në dorëzim
      </p>
      <div className="flex items-center gap-2">
        <span className="font-heading text-section-label font-semibold text-muted uppercase">
          Rendit
        </span>
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setSort(option.value)}
            aria-pressed={sortBy === option.value}
            className={buttonVariants({
              variant: sortBy === option.value ? "selected" : "outline",
              size: "toggle",
            })}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default UstahSortBar
