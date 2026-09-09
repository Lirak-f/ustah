import { Metadata } from "next"

import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import CategoryGrid from "@modules/home/components/category-grid"
import ProductRail from "@modules/home/components/product-rail"
import TrustBar from "@modules/home/components/trust-bar"

export const metadata: Metadata = {
  title: "Ustah — Hiper-market i hekurishtes",
  description:
    "Vegla, hidraulikë, ngrohje dhe materiale ndërtimi. Pagesa në dorëzim, dërgesa në Kosovë dhe Shqipëri.",
}

const OFFERS_HANDLE = "ofertat-e-javes"
const BESTSELLERS_HANDLE = "me-te-shiturat"

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const [categories, { collections }] = await Promise.all([
    listCategories({ limit: 8 }).catch(() => []),
    listCollections({ fields: "id,handle,title" }).catch(() => ({
      collections: [],
    })),
  ])

  const offers = collections.find((c) => c.handle === OFFERS_HANDLE)
  const bestsellers = collections.find((c) => c.handle === BESTSELLERS_HANDLE)

  // Both rails are optional: a collection that has not been seeded simply does
  // not render, rather than leaving an empty titled section behind.
  const [offerProducts, bestsellerProducts] = await Promise.all([
    offers
      ? listProducts({
          regionId: region.id,
          queryParams: { collection_id: [offers.id], limit: 5 },
        }).then((r) => r.response.products)
      : Promise.resolve([]),
    bestsellers
      ? listProducts({
          regionId: region.id,
          queryParams: { collection_id: [bestsellers.id], limit: 5 },
        }).then((r) => r.response.products)
      : Promise.resolve([]),
  ])

  const topLevel = categories
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))

  return (
    <div className="mx-auto max-w-[1440px] border border-border-strong bg-bg">
      <TrustBar />
      <CategoryGrid categories={topLevel} />
      <ProductRail
        title="Ofertat e javës"
        products={offerProducts}
        viewAllHref={`/collections/${OFFERS_HANDLE}`}
        viewAllLabel="Të gjitha ofertat"
      />
      <ProductRail
        title="Më të shiturat"
        products={bestsellerProducts}
        viewAllHref={`/collections/${BESTSELLERS_HANDLE}`}
        viewAllLabel="Të gjitha produktet"
      />
    </div>
  )
}
