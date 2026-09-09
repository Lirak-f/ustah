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

/** House brands carried in the seeded catalog. */
const brands = [
  "Kraftbau",
  "Nordvekt",
  "Termoplast",
  "Voltik",
  "Fixpro",
  "Gurëz",
]

export default async function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] border-x border-b border-border-strong bg-bg">
      {/* Brand strip */}
      <div className="px-7 pb-7">
        <h2 className="mb-3 text-[18px] uppercase tracking-[0.04em] text-muted">
          Markat
        </h2>
        <div className="grid grid-cols-3 gap-px border border-divider bg-divider sm:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="grid h-[64px] place-items-center bg-bg font-heading text-[16px] font-semibold uppercase tracking-[0.06em]"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-divider px-7 py-9">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <LocalizedClientLink href="/" className="flex items-end gap-1">
              <span className="font-heading text-[34px] font-bold leading-[0.85] tracking-[0.05em] text-accent">
                USTAH
              </span>
              <span className="mb-1 block size-[9px] bg-yellow" aria-hidden />
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
              <h3 className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
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
