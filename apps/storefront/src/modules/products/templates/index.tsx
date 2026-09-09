import React, { Suspense } from "react"
import { notFound } from "next/navigation"

import { productMeta } from "@lib/util/ustah-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImageGallery from "@modules/products/components/image-gallery"
import RelatedProducts from "@modules/products/components/related-products"
import UstahBuyBox from "@modules/products/components/ustah-buy-box"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const { brand } = productMeta(product.metadata)
  const category = product.categories?.[0]

  /**
   * Spec rows. Option titles and their values across variants describe what
   * actually differs between them; weight is shown in kg because the catalog
   * stores grams.
   */
  const specs: { key: string; value: string }[] = [
    ...(product.options ?? [])
      .filter((o) => o.title && (o.values?.length ?? 0) > 0)
      .map((o) => ({
        key: o.title as string,
        value: Array.from(
          new Set((o.values ?? []).map((v) => v.value).filter(Boolean)),
        ).join(" · "),
      })),
    ...(product.weight
      ? [
          {
            key: "Pesha",
            value: `${(product.weight / 1000).toLocaleString("de-DE", {
              maximumFractionDigits: 2,
            })} kg`,
          },
        ]
      : []),
    ...(brand ? [{ key: "Marka", value: brand }] : []),
  ]

  return (
    <div className="mx-auto max-w-[1440px] border border-border-strong bg-bg">
      <nav
        aria-label="Shtegu"
        className="flex flex-wrap items-center gap-2 border-b border-divider px-6 py-4 text-[12px] text-muted"
      >
        <LocalizedClientLink href="/" className="hover:text-accent">
          Kryefaqja
        </LocalizedClientLink>
        {category && (
          <>
            <span aria-hidden>/</span>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className="hover:text-accent"
            >
              {category.name}
            </LocalizedClientLink>
          </>
        )}
        <span aria-hidden>/</span>
        <span className="text-text">{product.title}</span>
      </nav>

      <div
        className="grid grid-cols-1 gap-px bg-divider lg:grid-cols-[520px_1fr_340px]"
        data-testid="product-container"
      >
        {/* Gallery */}
        <div className="bg-bg p-6">
          {images.length > 0 ? (
            <ImageGallery images={images} />
          ) : (
            <div
              className="grid aspect-square place-items-center bg-[repeating-linear-gradient(135deg,var(--color-surface)_0_7px,var(--color-bg)_7px_14px)]"
              aria-hidden
            >
              <span className="font-mono text-[11px] text-faint">
                foto produkti
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="bg-bg p-6">
          <p className="font-mono text-[11px] text-muted">
            {[
              brand,
              product.variants?.[0]?.sku && `Kodi ${product.variants[0].sku}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h1 className="mt-2 text-page-title">{product.title}</h1>
          {product.subtitle && (
            <p className="mt-2 text-[14px] text-muted-deep">
              {product.subtitle}
            </p>
          )}

          {product.description && (
            <p className="mt-5 max-w-[60ch] text-body">{product.description}</p>
          )}

          {specs.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 font-heading text-section-label font-semibold uppercase">
                Specifikimet teknike
              </h2>
              <table className="w-full text-[13px]">
                <tbody>
                  {specs.map((spec) => (
                    <tr key={spec.key} className="odd:bg-surface">
                      <th
                        scope="row"
                        className="w-1/2 px-4 py-3 text-left font-normal text-muted"
                      >
                        {spec.key}
                      </th>
                      <td className="px-4 py-3 text-right font-semibold">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>

        {/* Buy box */}
        <div className="bg-bg p-6">
          <UstahBuyBox product={product} />
        </div>
      </div>

      <div
        className="border-t border-divider"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
