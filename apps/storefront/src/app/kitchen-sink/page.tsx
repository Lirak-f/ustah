import { commerce } from "@ustah/design-tokens"

/**
 * Phase 0 verification surface.
 *
 * Renders every primitive the Ustah design defines, using only theme tokens, so
 * the extraction can be checked against design/ustah-storefront.html side by
 * side. Not linked from the app; it exists to catch token drift.
 *
 * If a colour here looks wrong, fix packages/design-tokens/src/tokens.ts and
 * regenerate — never patch the value in a component.
 */

export const metadata = { title: "Kitchen Sink — Ustah" }

function Section({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-9">
      <h2 className="font-heading text-section-label uppercase text-muted mb-3">
        {title}
      </h2>
      {note && <p className="text-xs text-muted mb-3 max-w-[70ch]">{note}</p>}
      <div className="bg-bg border border-divider p-5">{children}</div>
    </section>
  )
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="h-14 border border-divider"
        style={{ background: value }}
      />
      <span className="text-xs mt-1 font-mono">{name}</span>
      <span className="text-xs text-muted font-mono">{value}</span>
    </div>
  )
}

/** Formats an EUR amount the way the design does: comma decimal, € suffixed. */
function eur(n: number) {
  return `${n.toFixed(2).replace(".", ",")} €`
}

export default function KitchenSink() {
  const price = 129.0
  const exVat = price / (1 + commerce.vatRate)
  const lek = price * commerce.lekPerEur

  return (
    <div className="bg-page min-h-screen">
      <div className="mx-auto max-w-[1440px] p-7">
        <header className="mb-9">
          <div className="flex items-end gap-1">
            <span className="font-heading text-logo text-accent">USTAH</span>
            <span className="block h-2.5 w-2.5 bg-yellow mb-[3px]" />
          </div>
          <p className="text-muted text-small mt-2">
            Kitchen sink — çdo element vizual nga design reference.
          </p>
        </header>

        <Section
          title="Ngjyrat / Colours"
          note="Two accents: blue carries structure and interaction, yellow carries attention only (search action, discounts, offers). The design never uses yellow for a passive surface."
        >
          <div className="grid grid-cols-6 gap-3">
            <Swatch name="accent" value="#0071B9" />
            <Swatch name="accent-600" value="#005A94" />
            <Swatch name="accent-700" value="#004675" />
            <Swatch name="yellow" value="#FFCC00" />
            <Swatch name="text" value="#1A1A1A" />
            <Swatch name="muted" value="#4A5058" />
            <Swatch name="surface" value="#F4F5F7" />
            <Swatch name="page" value="#DDE1E6" />
            <Swatch name="divider" value="#E1E4E8" />
            <Swatch name="border-strong" value="#C9CDD3" />
            <Swatch name="danger" value="#C8102E" />
            <Swatch name="bg" value="#FFFFFF" />
          </div>
        </Section>

        <Section
          title="Tipografia / Type"
          note="Barlow Condensed for structure and numbers; Barlow for prose; mono for machine identifiers. Albanian ë/ç must render in every weight — if they fall back to a system face, the latin-ext subset is missing."
        >
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs text-muted font-mono">text-logo</span>
              <div className="font-heading text-logo">
                USTAH · Vegla elektrike
              </div>
            </div>
            <div>
              <span className="text-xs text-muted font-mono">text-price</span>
              <div className="font-heading text-price">{eur(price)}</div>
            </div>
            <div>
              <span className="text-xs text-muted font-mono">
                text-card-title
              </span>
              <div className="font-heading text-card-title">
                Trapan me bateri 18 V, 2 bateri 4,0 Ah
              </div>
            </div>
            <div>
              <span className="text-xs text-muted font-mono">
                text-nav (uppercase)
              </span>
              <div className="font-heading text-nav uppercase">
                Ndërtim &amp; çimento · Mbrojtje në punë
              </div>
            </div>
            <div>
              <span className="text-xs text-muted font-mono">text-body</span>
              <p className="text-body max-w-[70ch]">
                Pagesa në dorëzim (cash) — pa pagesë online. Çmimet me TVSH 18%.
                Faturë me TVSH për biznese me kërkesë. Dërgesa falas mbi 120 €.
              </p>
            </div>
            <div>
              <span className="text-xs text-muted font-mono">
                font-mono (SKU)
              </span>
              <div className="font-mono text-sku text-muted">
                KRAFTBAU · KB-18X · EAN 5901234123457
              </div>
            </div>
            <div className="border-t border-divider pt-3">
              <span className="text-xs text-muted font-mono">
                Albanian diacritics, all weights
              </span>
              <div className="font-heading" style={{ fontWeight: 400 }}>
                ë ç Ë Ç — Hidraulikë, Bojë &amp; izolim (400)
              </div>
              <div className="font-heading" style={{ fontWeight: 600 }}>
                ë ç Ë Ç — Hidraulikë, Bojë &amp; izolim (600)
              </div>
              <div className="font-heading" style={{ fontWeight: 700 }}>
                ë ç Ë Ç — Hidraulikë, Bojë &amp; izolim (700)
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Butonat / Buttons"
          note="Zero border-radius everywhere — square corners are the brand identity, not an oversight."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-accent text-bg font-heading text-sm uppercase tracking-wide px-5 h-[38px] hover:bg-accent-600">
              Shto në shportë
            </button>
            <button className="bg-yellow text-text font-heading font-bold text-base uppercase tracking-wide px-6 h-[46px] hover:bg-yellow-600">
              Kërko
            </button>
            <button className="border border-border-strong text-text font-heading text-sm uppercase px-5 h-[38px] hover:bg-surface">
              Krahaso
            </button>
            <button
              className="border border-divider bg-surface text-faint font-heading text-sm uppercase px-5 h-[38px] cursor-not-allowed"
              disabled
            >
              Jashtë stoku
            </button>
          </div>
        </Section>

        <Section
          title="Çmimi / Price block"
          note="Every price carries three figures: gross EUR (loud), approximate lek, and ex-VAT for trade buyers. The lek rate is display-only — EUR is the sole transacted currency."
        >
          <div className="flex gap-9">
            <div>
              <div className="font-heading text-price">{eur(price)}</div>
              <div className="text-xs text-muted-deep mt-0.5">
                ≈ {lek.toLocaleString("de-DE")} L · pa TVSH {eur(exVat)}
              </div>
            </div>
            <div>
              <div className="inline-block bg-yellow px-1.5 py-0.5">
                <span className="font-heading text-price">{eur(219)}</span>
              </div>
              <div className="text-xs text-muted-deep mt-0.5">
                <s>{eur(269)}</s> · ≈ 21.900 L
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Gjendja / Stock states"
          note="Three states in the design. Note the third has no stock figure at all — it is ordered in, and the card swaps 'Shto' for 'Porosit'."
        >
          <div className="flex flex-col gap-2 text-small">
            <span className="flex items-center gap-1.5">
              <i className="block h-2 w-2 bg-accent" />
              Në stok · 40+ copë
            </span>
            <span className="flex items-center gap-1.5">
              <i className="block h-2 w-2 bg-danger" />
              Vetëm 3 copë në stok
            </span>
            <span className="flex items-center gap-1.5">
              <i className="block h-2 w-2 bg-muted" />
              Me porosi · 5–7 ditë
            </span>
          </div>
        </Section>

        <Section
          title="Tabela e specifikimeve / Spec table"
          note="Key left in muted, value right in semibold. This is the pattern the card reuses at 4 rows — see the plan's note about products that have fewer."
        >
          <table className="w-full text-small max-w-[520px]">
            <tbody>
              {[
                ["Voltazhi", "18 V"],
                ["Momenti (i butë / i fortë)", "40 / 65 Nm"],
                ["Mandrina", "13 mm, pa çelës"],
                ["Shpejtësia (2 marshe)", "0–500 / 0–1.900 rrot/min"],
                ["Pesha me bateri", "1,4 kg"],
                ["Garancia", "3 vjet (profesionale)"],
              ].map(([k, v], i) => (
                <tr key={k} className={i % 2 ? "bg-surface" : undefined}>
                  <td className="py-1.5 px-2 text-muted">{k}</td>
                  <td className="py-1.5 px-2 text-right font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section
          title="Rrjeta e produkteve / Grid treatment"
          note="Cards are white islands on a divider-coloured ground with 1px gaps — the rules between cards are the background showing through, not borders. This is what gives the catalog its dense industrial look."
        >
          <div className="grid grid-cols-4 gap-px bg-divider border border-divider">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-bg p-3">
                <div
                  className="h-[170px] grid place-items-center mb-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg,#F4F5F7 0 7px,#fff 7px 14px)",
                  }}
                >
                  <span className="font-mono text-[10px] text-faint">
                    foto produkti
                  </span>
                </div>
                <div className="font-mono text-sku text-muted mb-1">
                  KRAFTBAU · KB-18X
                </div>
                <div className="font-heading text-card-title line-clamp-2">
                  Trapan me bateri 18 V, 2 bateri 4,0 Ah
                </div>
                <div className="font-heading text-price mt-2">{eur(price)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Filtrat / Filter sidebar"
          note="Facet counts are deliberately absent — deferred per the plan. The groups themselves come from attribute definitions, never hardcoded."
        >
          <aside className="w-[264px] bg-surface border border-divider">
            <div className="flex items-center gap-2 p-3 border-b border-divider font-heading text-[15px] uppercase tracking-wide">
              Filtra
              <span className="ml-auto bg-accent text-bg font-bold text-[10px] leading-4 px-1.5">
                3
              </span>
            </div>
            <div className="p-3 flex gap-1.5 flex-wrap border-b border-divider">
              {["18 V", "Kraftbau", "Në stok"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] border border-border-strong bg-bg px-2 py-0.5 flex gap-1"
                >
                  {t} <span className="text-muted">×</span>
                </span>
              ))}
            </div>
            <div className="p-3 border-b border-divider">
              <div className="font-heading text-section-label uppercase mb-2">
                Voltazhi
              </div>
              <div className="flex flex-col gap-1.5 text-small">
                {["12 V", "18 V", "20 V", "36 V"].map((v) => (
                  <label key={v} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={v === "18 V"} />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div className="p-3">
              <div className="font-heading text-section-label uppercase mb-2">
                Momenti rrotullues (Nm)
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  className="w-full h-8 text-center bg-bg border border-divider"
                  defaultValue="40"
                />
                <span className="text-xs text-muted">deri</span>
                <input
                  className="w-full h-8 text-center bg-bg border border-divider"
                  defaultValue="180"
                />
              </div>
            </div>
          </aside>
        </Section>
      </div>
    </div>
  )
}
