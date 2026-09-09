"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { useState } from "react"

import { IconSearch } from "@modules/common/icons"

/**
 * Header search. Submits to the store listing as a `q` param — the same
 * parameter the listing page reads, so search and filtering share one route.
 */
const UstahSearch = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") ?? "")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    const countryCode = params.countryCode as string
    router.push(
      q
        ? `/${countryCode}/store?q=${encodeURIComponent(q)}`
        : `/${countryCode}/store`,
    )
  }

  return (
    <form onSubmit={submit} className="flex min-w-0 flex-1" role="search">
      <label htmlFor="ustah-search" className="sr-only">
        Kërko produkte
      </label>
      <input
        id="ustah-search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Kërko mbi 24.000 artikuj — produkt, kod ose markë"
        className="h-[52px] min-w-0 flex-1 bg-bg px-6 text-[17px] text-text outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-inset"
      />
      <button
        type="submit"
        className="flex h-[52px] w-[140px] shrink-0 items-center justify-center gap-4 bg-yellow font-heading text-[18px] font-bold tracking-[0.04em] text-text uppercase transition-colors hover:bg-yellow-600 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-text"
      >
        <IconSearch className="size-[21px]" />
        Kërko
      </button>
    </form>
  )
}

export default UstahSearch
