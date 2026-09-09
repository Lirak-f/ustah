import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconCement,
  IconElectrical,
  IconFasteners,
  IconHeating,
  IconPaint,
  IconPlumbing,
  IconPowerTool,
  IconSafety,
} from "@modules/common/icons"

/**
 * Icon per category handle. Handles come from the seed (src/data/ustah-catalog.ts);
 * a category without an entry falls back to the power-tool mark rather than
 * rendering an empty tile.
 */
const ICONS: Record<string, typeof IconPowerTool> = {
  "vegla-elektrike": IconPowerTool,
  hidraulike: IconPlumbing,
  ngrohje: IconHeating,
  elektrike: IconElectrical,
  "vida-ankera": IconFasteners,
  "ndertim-cimento": IconCement,
  "boje-izolim": IconPaint,
  "mbrojtje-ne-pune": IconSafety,
}

type Props = {
  categories: HttpTypes.StoreProductCategory[]
}

const CategoryGrid = ({ categories }: Props) => {
  if (!categories.length) {
    return null
  }

  return (
    <section className="bg-bg">
      <div className="flex items-baseline justify-between px-7 pt-8">
        <h2 className="text-[26px] tracking-[0.01em] uppercase">Kategoritë</h2>
        <LocalizedClientLink
          href="/store"
          className="text-[13px] text-accent hover:underline"
        >
          Të gjitha {categories.length} kategoritë
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-1 gap-px px-7 pt-5 pb-7 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = ICONS[category.handle] ?? IconPowerTool
          const count = category.products?.length ?? 0

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="flex h-[150px] flex-col justify-between bg-accent p-6 text-white transition-colors hover:bg-accent-600"
            >
              <Icon className="size-[34px]" />
              <span>
                <span className="block font-heading text-[24px] leading-[1.02] font-bold uppercase">
                  {category.name}
                </span>
                {count > 0 && (
                  <span className="text-[12px] opacity-90">
                    {count} {count === 1 ? "artikull" : "artikuj"}
                  </span>
                )}
              </span>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryGrid
