import { commerce } from "@ustah/design-tokens"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Ustah footer.
 *
 * Three link columns plus the store's terms. The terms line is not decoration:
 * cash-on-delivery only, VAT-inclusive pricing and VAT invoicing on request are
 * the actual commercial terms, and the design gives them their own row.
 */

const columns = [
  {
    title: "Porosia",
    links: [
      { label: "Si funksionon porosia", href: "/store" },
      { label: "Pagesa në dorëzim", href: "/store" },
      { label: "Dërgesa & tarifat", href: "/store" },
      { label: "Gjurmo porosinë", href: "/account/orders" },
    ],
  },
  {
    title: "Për tregtarë",
    links: [
      { label: "Llogari tregtari", href: "/account" },
      { label: "Çmime për sasi", href: "/store" },
      { label: "Faturë me TVSH", href: "/store" },
      { label: "Ofertë për projekt", href: "/store" },
    ],
  },
  {
    title: "Ndihmë",
    links: [
      { label: "Kthimi brenda 14 ditësh", href: "/store" },
      { label: "Garancia & servisi", href: "/store" },
      { label: "Depot dhe orari", href: "/store" },
      { label: "Kontakt", href: "/store" },
    ],
  },
]

/**
 * Manufacturer brands carried, one per category the nav sells.
 *
 * `logo` is a path under `public/brands/` (PNG or JPEG). The strip shows the
 * marks alone, with no name beside them, so the logo is the brand's only label
 * and carries its `alt`. The files are wordmarks of very different proportions
 * — roughly 1:1 (Viola) to 3.8:1 (Tiemme) — so each is fitted into the tile
 * with `object-contain` and capped by height, never cropped. A brand with no
 * file yet falls back to its name set as type, which keeps the strip whole;
 * these are third-party trademarks, added deliberately.
 */
const brands: { name: string; logo?: string }[] = [
  { name: "Bosch", logo: "/brands/bosch.png" }, // vegla elektrike
  { name: "Tiemme", logo: "/brands/tiemme.png" }, // hidraulikë
  { name: "Knauf", logo: "/brands/knauf.png" }, // suva & pllaka gipsi
  { name: "Viola", logo: "/brands/viola.jpg" },
  { name: "Schneider Electric", logo: "/brands/schneider.jpg" }, // elektrike
  { name: "Fischer", logo: "/brands/fischer.png" }, // vida & ankera
]

export default async function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] border-x border-b border-border-strong bg-bg">
      {/* Brand strip */}
      <div className="px-7 pb-7">
        <h2 className="mb-3 text-[18px] tracking-[0.04em] text-muted uppercase">
          Markat
        </h2>
        <div className="grid grid-cols-3 gap-px border border-divider bg-divider sm:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[64px] items-center justify-center bg-bg px-5"
            >
              {brand.logo ? (
                /* The mark carries the name, so it is the accessible label
                   rather than decoration. Images are `unoptimized`, so
                   next/image would add nothing; `mix-blend-multiply` drops the
                   white box the JPEG marks carry against the white tile and is
                   a no-op on the transparent PNGs. */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={116}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="max-h-8 w-full object-contain mix-blend-multiply"
                />
              ) : (
                <span className="font-heading text-[15px] font-semibold tracking-[0.06em] uppercase">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-divider px-7 py-9">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <LocalizedClientLink href="/" className="flex items-end gap-1">
              <span className="font-heading text-[34px] leading-[0.85] font-bold tracking-wider text-accent">
                USTAH
              </span>
              <span className="mb-1 block size-4 bg-yellow" aria-hidden />
            </LocalizedClientLink>
            <p className="mt-5 max-w-[38ch] text-[13px] text-muted-deep">
              Hardware dhe material ndërtimi për tregtarë dhe shtëpi. Depot:
              Prishtinë, Fushë Kosovë, Tiranë.
            </p>
            <a
              href="tel:038700700"
              className="mt-3 inline-block font-heading text-[20px] font-bold text-text"
            >
              038 700 700
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 font-heading text-[13px] font-semibold tracking-[0.06em] text-muted uppercase">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-[13px] text-text hover:text-accent hover:underline"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Commercial terms */}
      <div className="flex flex-col gap-2 border-t border-divider px-7 py-6 text-[12px] text-muted-deep sm:flex-row sm:items-center sm:justify-between">
        <p>
          Pagesa vetëm në dorëzim (cash) — pa pagesë online. Çmimet me TVSH{" "}
          {Math.round(commerce.vatRate * 100)}%. Faturë me TVSH për biznese me
          kërkesë.
        </p>
        <p>© {new Date().getFullYear()} Ustah</p>
      </div>
    </footer>
  )
}
