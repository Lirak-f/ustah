import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { formatEur } from "@lib/util/ustah-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconMenu, IconUser } from "@modules/common/icons"
import UstahCartChip from "@modules/layout/components/ustah-cart-chip"
import UstahSearch from "@modules/layout/components/ustah-search"
import SideMenu from "@modules/layout/components/side-menu"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { HttpTypes, StoreRegion } from "@medusajs/types"

/** The design highlights this link in yellow at the end of the category row. */
const OFFERS_HANDLE = "ofertat-e-javes"

export default async function Nav({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) {
  const [categories, regions, locales, currentLocale] = await Promise.all([
    listCategories({ limit: 8 }).catch(() => []),
    listRegions()
      .then((r: StoreRegion[]) => r)
      .catch(() => []),
    listLocales().catch(() => []),
    getLocale().catch(() => null),
  ])

  // Only top-level categories belong in the nav row; children appear in the
  // listing sidebar.
  const topLevel = categories
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))

  return (
    <header className="bg-bg">
      {/* Utility strip */}
      <div className="bg-accent-700 text-white">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center gap-6 px-7 text-[12px]">
          <span className="hidden md:inline">
            Depot: Prishtinë · Fushë Kosovë · Tiranë
          </span>
          <span className="hidden opacity-45 md:inline">|</span>
          <span className="hidden sm:inline">Pagesa në dorëzim (cash)</span>
          <span className="hidden opacity-45 lg:inline">|</span>
          <span className="hidden lg:inline">Faturë me TVSH për biznese</span>
          <div className="ml-auto flex items-center gap-6">
            <LocalizedClientLink
              href="/account/orders"
              className="hidden text-white hover:underline sm:inline"
            >
              Gjurmo porosinë
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              className="hidden text-white hover:underline md:inline"
            >
              Llogari tregtari
            </LocalizedClientLink>
            <a href="tel:038700700" className="font-semibold text-white">
              038 700 700
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-accent text-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-7 px-7 py-6">
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            className="flex shrink-0 items-end gap-1"
          >
            <span className="font-heading text-[40px] leading-[0.85] font-bold tracking-wider">
              USTAH
            </span>
            <span className="mb-1 block size-[11px] bg-yellow" aria-hidden />
          </LocalizedClientLink>

          {/* Mobile: the side menu carries the categories the nav row shows on desktop. */}
          <div className="lg:hidden">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>

          <LocalizedClientLink
            href="/store"
            className="hidden h-[52px] shrink-0 items-center gap-4 bg-accent-600 px-6 font-heading text-[16px] font-semibold tracking-[0.04em] text-white uppercase transition-colors hover:bg-accent-700 xl:flex"
          >
            <IconMenu className="size-[19px]" />
            Të gjitha kategoritë
          </LocalizedClientLink>

          <Suspense
            fallback={<div className="h-[52px] flex-1 bg-bg" aria-hidden />}
          >
            <UstahSearch />
          </Suspense>

          <LocalizedClientLink
            href="/account"
            data-testid="nav-account-link"
            className="hidden shrink-0 items-center gap-3 text-[13px] leading-[1.2] text-white hover:underline md:flex"
          >
            <IconUser className="size-[23px]" />
            {customer ? (
              <span>
                {customer.first_name ? (
                  <>
                    {customer.first_name}
                    <br />
                    {customer.last_name}
                  </>
                ) : null}
              </span>
            ) : (
              <span>
                Hyr /<br />
                Regjistrohu
              </span>
            )}
          </LocalizedClientLink>

          <Suspense
            fallback={
              <LocalizedClientLink
                href="/cart"
                data-testid="nav-cart-link"
                className="flex shrink-0 items-center gap-4 bg-accent-600 px-5 py-4 text-[13px] leading-[1.2] text-white"
              >
                Shporta
                <br />
                <b className="font-heading text-[16px]">{formatEur(0)}</b>
              </LocalizedClientLink>
            }
          >
            <UstahCartChip />
          </Suspense>
        </div>

        {/* Category row */}
        {topLevel.length > 0 && (
          <nav aria-label="Kategoritë" className="bg-accent-600">
            <div className="mx-auto no-scrollbar flex max-w-[1440px] items-center overflow-x-auto px-7">
              {topLevel.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="p-5 font-heading text-[13px] leading-none font-semibold tracking-wider whitespace-nowrap text-white uppercase hover:bg-accent-700"
                >
                  {category.name}
                </LocalizedClientLink>
              ))}
              <LocalizedClientLink
                href={`/collections/${OFFERS_HANDLE}`}
                className="ml-auto p-5 font-heading text-[13px] leading-none font-bold tracking-wider whitespace-nowrap text-yellow uppercase hover:bg-accent-700"
              >
                Ofertat e javës
              </LocalizedClientLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
