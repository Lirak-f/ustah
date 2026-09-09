import { commerce } from "@ustah/design-tokens"

import {
  IconBox,
  IconCash,
  IconInvoice,
  IconTruck,
} from "@modules/common/icons"

/**
 * The four trust claims under the header. These are the store's actual terms —
 * cash on delivery, delivery windows, the free-delivery threshold and VAT
 * invoicing — so the threshold reads from the shared commerce token rather than
 * being written into the copy twice.
 */
const claims = [
  {
    Icon: IconCash,
    title: "Pagesa në dorëzim",
    detail: "Cash kur e merr — pa kartë, pa parapagim",
  },
  {
    Icon: IconTruck,
    title: "Prishtinë 1–2 ditë · Tiranë 2–3 ditë",
    detail: "Porosit deri 15:00 — niset të njëjtën ditë",
  },
  {
    Icon: IconBox,
    title: `Dërgesa falas mbi ${commerce.freeDeliveryThreshold} €`,
    detail: "Në Kosovë dhe Shqipëri",
  },
  {
    Icon: IconInvoice,
    title: "Faturë me TVSH për biznese",
    detail: "Llogari tregtari me çmime sasie",
  },
]

const TrustBar = () => (
  <ul className="grid grid-cols-1 gap-px border-b border-divider bg-divider sm:grid-cols-2 xl:grid-cols-4">
    {claims.map(({ Icon, title, detail }) => (
      <li key={title} className="flex items-center gap-5 bg-bg px-7 py-5">
        <Icon className="size-[22px] shrink-0 text-accent" />
        <span className="text-[13px] leading-[1.35]">
          <b>{title}</b>
          <br />
          <span className="text-muted-deep">{detail}</span>
        </span>
      </li>
    ))}
  </ul>
)

export default TrustBar
