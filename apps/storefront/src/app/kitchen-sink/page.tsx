import { commerce } from "@ustah/design-tokens"

/**
 * Phase 0 verification surface.
 *
 * Renders every primitive the Ustah design defines, using only theme tokens, so
 * the extraction can be checked against the Claude Design project side by
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
      <h2 className="mb-3 font-heading text-section-label text-muted uppercase">
        {title}
      </h2>
      {note && <p className="mb-3 max-w-[70ch] text-xs text-muted">{note}</p>}
      <div className="border border-divider bg-bg p-5">{children}</div>
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
      <span className="mt-1 font-mono text-xs">{name}</span>
      <span className="font-mono text-xs text-muted">{value}</span>
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

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto max-w-[1440px] p-7">
        <header className="mb-9">
          <div className="flex items-end gap-1">
            <span className="font-heading text-logo text-accent">USTAH</span>
            <span className="mb-[3px] block size-2.5 bg-yellow" />
          </div>
          <p className="mt-2 text-small text-muted">
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
              <span className="font-mono text-xs text-muted">text-logo</span>
              <div className="font-heading text-logo">
                USTAH · Vegla elektrike
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-muted">text-price</span>
              <div className="font-heading text-price">{eur(price)}</div>
            </div>
            <div>
              <span className="font-mono text-xs text-muted">
                text-card-title
              </span>
              <div className="font-heading text-card-title">
                Trapan me bateri 18 V, 2 bateri 4,0 Ah
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-muted">
                text-nav (uppercase)
              </span>
              <div className="font-heading text-nav uppercase">
                Ndërtim &amp; çimento · Mbrojtje në punë
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-muted">text-body</span>
              <p className="max-w-[70ch] text-body">
                Pagesa në dorëzim (cash) — pa pagesë online. Çmimet me TVSH 18%.
                Faturë me TVSH për biznese me kërkesë. Dërgesa falas mbi 120 €.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-muted">
                font-mono (SKU)
              </span>
              <div className="font-mono text-sku text-muted">
                KRAFTBAU · KB-18X · EAN 5901234123457
              </div>
            </div>
            <div className="border-t border-divider pt-3">
              <span className="font-mono text-xs text-muted">
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
            <button className="h-[38px] bg-accent px-5 font-heading text-sm tracking-wide text-bg uppercase hover:bg-accent-600">
              Shto në shportë
            </button>
            <button className="h-[46px] bg-yellow px-6 font-heading text-base font-bold tracking-wide text-text uppercase hover:bg-yellow-600">
              Kërko
            </button>
            <button className="h-[38px] border border-border-strong px-5 font-heading text-sm text-text uppercase hover:bg-surface">
              Krahaso
            </button>
            <button
              className="h-[38px] cursor-not-allowed border border-divider bg-surface px-5 font-heading text-sm text-faint uppercase"
              disabled
            >
              Jashtë stoku
            </button>
          </div>
        </Section>

        <Section
          title="Çmimi / Price block"
          note="Every price carries two figures: gross EUR (loud) and ex-VAT for trade buyers. EUR is the sole transacted currency."
        >
          <div className="flex gap-9">
            <div>
              <div className="font-heading text-price">{eur(price)}</div>
              <div className="mt-0.5 text-xs text-muted-deep">
                pa TVSH {eur(exVat)}
              </div>
            </div>
            <div>
              <div className="inline-block bg-yellow px-1.5 py-0.5">
                <span className="font-heading text-price">{eur(219)}</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-deep">
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
              <i className="block size-2 bg-accent" />
              Në stok · 40+ copë
            </span>
            <span className="flex items-center gap-1.5">
              <i className="block size-2 bg-danger" />
              Vetëm 3 copë në stok
            </span>
            <span className="flex items-center gap-1.5">
              <i className="block size-2 bg-muted" />
              Me porosi · 5–7 ditë
            </span>
          </div>
        </Section>

        <Section
          title="Tabela e specifikimeve / Spec table"
          note="Key left in muted, value right in semibold. This is the pattern the card reuses at 4 rows — see the plan's note about products that have fewer."
        >
          <table className="w-full max-w-[520px] text-small">
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
                  <td className="px-2 py-1.5 text-muted">{k}</td>
                  <td className="px-2 py-1.5 text-right font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section
          title="Rrjeta e produkteve / Grid treatment"
          note="Cards are white islands on a divider-coloured ground with 1px gaps — the rules between cards are the background showing through, not borders. This is what gives the catalog its dense industrial look."
        >
          <div className="grid grid-cols-4 gap-px border border-divider bg-divider">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-bg p-3">
                <div className="mb-2 grid h-[170px] place-items-center bg-hatch">
                  <span className="font-mono text-[10px] text-faint">
                    foto produkti
                  </span>
                </div>
                <div className="mb-1 font-mono text-sku text-muted">
                  KRAFTBAU · KB-18X
                </div>
                <div className="line-clamp-2 font-heading text-card-title">
                  Trapan me bateri 18 V, 2 bateri 4,0 Ah
                </div>
                <div className="mt-2 font-heading text-price">{eur(price)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Filtrat / Filter sidebar"
          note="Facet counts are deliberately absent — deferred per the plan. The groups themselves come from attribute definitions, never hardcoded."
        >
          <aside className="w-[264px] border border-divider bg-surface">
            <div className="flex items-center gap-2 border-b border-divider p-3 font-heading text-[15px] tracking-wide uppercase">
              Filtra
              <span className="ml-auto bg-accent px-1.5 text-[10px] leading-4 font-bold text-bg">
                3
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 border-b border-divider p-3">
              {["18 V", "Kraftbau", "Në stok"].map((t) => (
                <span
                  key={t}
                  className="flex gap-1 border border-border-strong bg-bg px-2 py-0.5 text-[11px]"
                >
                  {t} <span className="text-muted">×</span>
                </span>
              ))}
            </div>
            <div className="border-b border-divider p-3">
              <div className="mb-2 font-heading text-section-label uppercase">
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
              <div className="mb-2 font-heading text-section-label uppercase">
                Momenti rrotullues (Nm)
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  className="h-8 w-full border border-divider bg-bg text-center"
                  defaultValue="40"
                />
                <span className="text-xs text-muted">deri</span>
                <input
                  className="h-8 w-full border border-divider bg-bg text-center"
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
