import { HttpTypes } from "@medusajs/types"

import type { FilterGroup } from "@modules/store/components/ustah-filters"

/**
 * Builds the sidebar's filter groups from the products actually on the page.
 *
 * Options in this catalog are per-product — each product declares its own axis
 * (voltage, diameter, pack size) rather than sharing a global Size/Color pair.
 * Listing every option in the catalog would put "Klasa" (cement grades) and
 * "Amperazhi" (breaker ratings) on the power-tools page, so the groups are
 * derived from the current result set instead.
 */
export const buildFilterGroups = (
  products: HttpTypes.StoreProduct[],
): FilterGroup[] => {
  const byTitle = new Map<string, FilterGroup>()

  for (const product of products) {
    for (const option of product.options ?? []) {
      const title = option.title?.trim()
      if (!title) {
        continue
      }

      const group = byTitle.get(title) ?? { id: option.id, title, values: [] }

      for (const value of option.values ?? []) {
        if (!value.id || !value.value) {
          continue
        }
        // The same label on two products carries two different value ids; one
        // checkbox per label is what a shopper expects, so keep the first.
        if (!group.values.some((existing) => existing.value === value.value)) {
          group.values.push({ id: value.id, value: value.value })
        }
      }

      if (group.values.length > 0) {
        byTitle.set(title, group)
      }
    }
  }

  return Array.from(byTitle.values()).sort((a, b) =>
    a.title.localeCompare(b.title, "sq"),
  )
}
