"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { useState } from "react"

import { IconSearch } from "@modules/common/icons/ustah"

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
    <form onSubmit={submit} className="flex flex-1 min-w-0" role="search">
      <label htmlFor="ustah-search" className="sr-only">
        Kërko produkte
      </label>
      <input
        id="ustah-search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Kërko mbi 24.000 artikuj — produkt, kod ose markë"
        className="flex-1 min-w-0 h-[52px] bg-bg text-text px-6 text-[17px] outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-inset"
      />
      <button
        type="submit"
        className="flex h-[52px] w-[140px] shrink-0 items-center justify-center gap-4 bg-yellow font-heading text-[18px] font-bold uppercase tracking-[0.04em] text-text transition-colors hover:bg-yellow-600 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-text"
      >
        <IconSearch className="size-[21px]" />
        Kërko
      </button>
    </form>
  )
}

export default UstahSearch
