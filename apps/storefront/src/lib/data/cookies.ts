import "server-only"
import { cookies as nextCookies } from "next/headers"

export const getAuthHeaders = async (): Promise<
  { authorization: string } | Record<string, never>
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) {
      return {}
    }

    return { authorization: `Bearer ${token}` }
  } catch {
    return {}
  }
}

/**
 * Catalog tags that are shared by every visitor.
 *
 * The rest of the tags name data that belongs to ONE shopper — their cart,
 * their customer record, their orders, the delivery options quoted for their
 * cart — and those stay partitioned by `_medusa_cache_id` so one visitor can
 * never be served another's response.
 *
 * This is deliberately an allowlist rather than a denylist: a tag nobody
 * thought about stays per-visitor, which is slow but safe. Adding a tag here
 * is a decision that its data is identical for all shoppers.
 *
 * Catalog data qualifies because price varies by REGION, not by visitor, and
 * the region is already part of both the fetch URL and the `regions-<id>` tag.
 */
const GLOBAL_CACHE_TAGS = new Set([
  "products",
  "categories",
  "collections",
  "regions",
  "variants",
  "locales",
  "payment_providers",
])

/**
 * Cache tag for a data set.
 *
 * Catalog tags are returned as-is so every visitor shares one Next.js data
 * cache entry. Previously ALL tags were suffixed with the per-visitor
 * `_medusa_cache_id` that middleware mints as a fresh UUID, which partitioned
 * the catalog cache per visitor — `cache: "force-cache"` on products then
 * bought nothing, because the first request of every session was a cold miss.
 *
 * `tag` may be composite (`regions-<id>`), so the lookup uses the segment
 * before the first `-`.
 */
export const getCacheTag = async (tag: string): Promise<string> => {
  if (GLOBAL_CACHE_TAGS.has(tag.split("-")[0])) {
    return tag
  }

  try {
    const cookies = await nextCookies()
    const cacheId = cookies.get("_medusa_cache_id")?.value

    if (!cacheId) {
      return ""
    }

    return `${tag}-${cacheId}`
  } catch {
    return ""
  }
}

export const getCacheOptions = async (
  tag: string,
): Promise<{ tags: string[] } | Record<string, never>> => {
  if (typeof window !== "undefined") {
    return {}
  }

  const cacheTag = await getCacheTag(tag)

  if (!cacheTag) {
    return {}
  }

  return { tags: [`${cacheTag}`] }
}

// `sameSite: "lax"` rather than `"strict"`: a customer arriving from an
// external link or an off-site auth redirect does so via a cross-site
// top-level navigation. A "strict" cookie is withheld on that navigation, so
// the storefront would see a logged-out, cartless visitor. "lax" is sent on
// top-level GET navigations while still blocking cross-site subrequests.
export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeAuthToken = async () => {
  const cookies = await nextCookies()
  cookies.set("_medusa_jwt", "", {
    maxAge: -1,
  })
}

export type PendingCustomer = {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
}

// During the email verification flow the customer record isn't created until
// the customer verifies their email and logs in. We temporarily persist the
// extra signup fields in a cookie so they survive the customer leaving to open
// their inbox, and read them back when creating the customer at login.
export const setPendingCustomer = async (customer: PendingCustomer) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_pending_customer", JSON.stringify(customer), {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const getPendingCustomer = async (): Promise<PendingCustomer | null> => {
  const cookies = await nextCookies()
  const value = cookies.get("_medusa_pending_customer")?.value

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as PendingCustomer
  } catch {
    return null
  }
}

export const removePendingCustomer = async () => {
  const cookies = await nextCookies()
  cookies.set("_medusa_pending_customer", "", {
    maxAge: -1,
  })
}

export const getCartId = async () => {
  const cookies = await nextCookies()
  return cookies.get("_medusa_cart_id")?.value
}

// See the note on `setAuthToken`: `sameSite: "lax"` so the cart cookie survives
// the cross-site return navigation from a redirect-based payment method.
export const setCartId = async (cartId: string) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeCartId = async () => {
  const cookies = await nextCookies()
  cookies.set("_medusa_cart_id", "", {
    maxAge: -1,
  })
}
