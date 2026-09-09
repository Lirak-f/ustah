/**
 * Ustah catalog data — the hardware assortment the storefront is designed around.
 *
 * Kept separate from initial-data-seed.ts so the seed script stays readable as a
 * sequence of workflow calls while the catalog itself can grow.
 *
 * Conventions that the storefront depends on:
 *  - Prices are EUR, VAT-inclusive (Kosovo 18%). EUR is the only transacted
 *    currency.
 *  - `metadata.brand` and the variant SKU drive the mono "BRAND · SKU" line on
 *    the product card, so every product carries a brand.
 *  - `metadata.compare_at` is the pre-discount price used to render the yellow
 *    discount badge. Only products in the "Ofertat e javes" collection have it.
 */

/** Category tree from the design's nav row, in nav order. */
export const categories = [
  {
    name: "Vegla elektrike",
    handle: "vegla-elektrike",
    description: "Trapanë, brusa, sharra dhe vegla me bateri.",
  },
  {
    name: "Hidraulikë",
    handle: "hidraulike",
    description: "Gypa, rakorderi, pompa dhe armatura.",
  },
  {
    name: "Ngrohje",
    handle: "ngrohje",
    description: "Kaldaja, radiatorë dhe ngrohje dyshemeje.",
  },
  {
    name: "Elektrike",
    handle: "elektrike",
    description: "Kabllo, automatë, priza dhe ndriçim.",
  },
  {
    name: "Vida & ankera",
    handle: "vida-ankera",
    description: "Vida, ankera dhe fiksime — me kuti ose me kilogram.",
  },
  {
    name: "Ndërtim & çimento",
    handle: "ndertim-cimento",
    description: "Çimento, llaç dhe materiale ndërtimi.",
  },
  {
    name: "Bojë & izolim",
    handle: "boje-izolim",
    description: "Bojëra, suvatime dhe hidroizolim.",
  },
  {
    name: "Mbrojtje në punë",
    handle: "mbrojtje-ne-pune",
    description: "Doreza, helmeta, syze dhe këpucë pune.",
  },
] as const

export type UstahCategoryHandle = (typeof categories)[number]["handle"]

/** Collections used by the storefront rails. */
export const collections = [
  { title: "Ofertat e javës", handle: "ofertat-e-javes" },
  { title: "Më të shiturat", handle: "me-te-shiturat" },
] as const

type SeedVariant = {
  title: string
  sku: string
  /** EUR, VAT-inclusive. */
  price: number
  /**
   * Pre-discount EUR price for THIS variant. Lives on the variant, not the
   * product, because price is per-variant: a product-level figure cannot say
   * which variant it discounts. The card leads with the discounted variant,
   * matching the design's own KB-SET2 card (219,00 € struck from 269,00 €).
   */
  compareAt?: number
  options: Record<string, string>
}

export type SeedProduct = {
  title: string
  handle: string
  description: string
  brand: string
  category: UstahCategoryHandle
  collection?: (typeof collections)[number]["handle"]
  /** Short spec line under the card title. */
  subtitle: string
  weight: number
  optionTitle: string
  variants: SeedVariant[]
}

/**
 * 24 products across the 8 categories. Variant axes are per-product (dimension,
 * capacity, pack size) rather than the apparel Size/Color pair, so each product
 * declares its own option title.
 */
export const products: SeedProduct[] = [
  // ── Vegla elektrike ────────────────────────────────────────────────────
  {
    title: "Set trapan + impakt 18 V",
    handle: "set-trapan-impakt-18v",
    description:
      "Set profesional me trapan me perkusion dhe çelës impakt 18 V. Dy bateri 5,0 Ah, karikues i shpejtë, valixhe transporti dhe 12 bita.",
    brand: "KRAFTBAU",
    category: "vegla-elektrike",
    collection: "ofertat-e-javes",
    subtitle: "2 × 5,0 Ah · valixhe · 12 bita",
    weight: 6200,
    optionTitle: "Bateria",
    variants: [
      {
        title: "2 × 2,0 Ah",
        sku: "KB-SET2-20",
        price: 179,
        options: { Bateria: "2 × 2,0 Ah" },
      },
      {
        title: "2 × 5,0 Ah",
        sku: "KB-SET2-50",
        price: 219,
        compareAt: 269,
        options: { Bateria: "2 × 5,0 Ah" },
      },
    ],
  },
  {
    title: "Brus këndor 125 mm 1.200 W",
    handle: "brus-kendor-125mm",
    description:
      "Brus këndor me motor 1.200 W, mbrojtëse pa vegël dhe dorezë anësore me tre pozicione.",
    brand: "KRAFTBAU",
    category: "vegla-elektrike",
    collection: "me-te-shiturat",
    subtitle: "1.200 W · M14 · ndalim i shpejtë",
    weight: 2400,
    optionTitle: "Diametri",
    variants: [
      {
        title: "115 mm",
        sku: "KB-AG115",
        price: 62,
        options: { Diametri: "115 mm" },
      },
      {
        title: "125 mm",
        sku: "KB-AG125",
        price: 69,
        options: { Diametri: "125 mm" },
      },
    ],
  },
  {
    title: "Sharrë rrethore 190 mm",
    handle: "sharre-rrethore-190mm",
    description:
      "Sharrë rrethore 1.400 W me thellësi prerjeje 63 mm dhe bazament alumini.",
    brand: "KRAFTBAU",
    category: "vegla-elektrike",
    subtitle: "1.400 W · thellësi 63 mm",
    weight: 4100,
    optionTitle: "Modeli",
    variants: [
      {
        title: "Standard",
        sku: "KB-CS190",
        price: 98,
        options: { Modeli: "Standard" },
      },
      {
        title: "Me lazer",
        sku: "KB-CS190-L",
        price: 119,
        options: { Modeli: "Me lazer" },
      },
    ],
  },
  // ── Hidraulikë ─────────────────────────────────────────────────────────
  {
    title: "Pompë uji 1.200 W",
    handle: "pompe-uji-1200w",
    description:
      "Pompë sipërfaqësore vetë-thithëse me trup gize, e përshtatshme për ujitje dhe furnizim shtëpiak.",
    brand: "NORDVEKT",
    category: "hidraulike",
    collection: "ofertat-e-javes",
    subtitle: "3.600 l/h · lartësi 45 m",
    weight: 11500,
    optionTitle: "Fuqia",
    variants: [
      { title: "900 W", sku: "ND-900", price: 92, options: { Fuqia: "900 W" } },
      {
        title: "1.200 W",
        sku: "ND-1200",
        price: 112,
        compareAt: 149,
        options: { Fuqia: "1.200 W" },
      },
    ],
  },
  {
    title: "Gyp PPR 20 mm PN20",
    handle: "gyp-ppr-20mm",
    description:
      "Gyp polipropileni PN20 për ujë të ngrohtë dhe të ftohtë. Shitet me shufra 4 m.",
    brand: "TERMOPLAST",
    category: "hidraulike",
    collection: "me-te-shiturat",
    subtitle: "PN20 · shufra 4 m · ujë i ngrohtë",
    weight: 900,
    optionTitle: "Diametri",
    variants: [
      {
        title: "20 mm",
        sku: "TP-PPR20",
        price: 3,
        options: { Diametri: "20 mm" },
      },
      {
        title: "25 mm",
        sku: "TP-PPR25",
        price: 4,
        options: { Diametri: "25 mm" },
      },
      {
        title: "32 mm",
        sku: "TP-PPR32",
        price: 6,
        options: { Diametri: "32 mm" },
      },
    ],
  },
  {
    title: 'Rubinet ndalues 1/2"',
    handle: "rubinet-ndalues-12",
    description:
      "Rubinet sferik prej bronzi me dorezë çeliku, për instalime uji nën presion.",
    brand: "TERMOPLAST",
    category: "hidraulike",
    subtitle: "Bronz · PN16 · dorezë çeliku",
    weight: 260,
    optionTitle: "Masa",
    variants: [
      { title: '1/2"', sku: "TP-BV12", price: 7, options: { Masa: '1/2"' } },
      { title: '3/4"', sku: "TP-BV34", price: 9, options: { Masa: '3/4"' } },
      { title: '1"', sku: "TP-BV10", price: 13, options: { Masa: '1"' } },
    ],
  },
  // ── Ngrohje ────────────────────────────────────────────────────────────
  {
    title: "Radiator alumini 600 mm",
    handle: "radiator-alumini-600",
    description:
      "Radiator alumini me presion pune 16 bar, i lyer me pluhur të bardhë. Çmimi për element.",
    brand: "TERMOPLAST",
    category: "ngrohje",
    subtitle: "Për element · 16 bar · i bardhë",
    weight: 1300,
    optionTitle: "Lartësia",
    variants: [
      {
        title: "350 mm",
        sku: "TP-RAD350",
        price: 11,
        options: { Lartësia: "350 mm" },
      },
      {
        title: "600 mm",
        sku: "TP-RAD600",
        price: 15,
        options: { Lartësia: "600 mm" },
      },
    ],
  },
  {
    title: "Kaldajë gazi 24 kW",
    handle: "kaldaje-gazi-24kw",
    description:
      "Kaldajë murale me kondensim, ujë sanitar i menjëhershëm dhe komandë dixhitale.",
    brand: "NORDVEKT",
    category: "ngrohje",
    collection: "ofertat-e-javes",
    subtitle: "Kondensim · ujë sanitar · murale",
    weight: 34000,
    optionTitle: "Fuqia",
    variants: [
      {
        title: "24 kW",
        sku: "ND-BLR24",
        price: 749,
        options: { Fuqia: "24 kW" },
      },
      {
        title: "28 kW",
        sku: "ND-BLR28",
        price: 829,
        compareAt: 899,
        options: { Fuqia: "28 kW" },
      },
    ],
  },
  {
    title: "Termostat dhome me tel",
    handle: "termostat-dhome",
    description:
      "Termostat programues javor me ekran LCD, i përshtatshëm për kaldaja dhe pompa nxehtësie.",
    brand: "VOLTIK",
    category: "ngrohje",
    subtitle: "Programues javor · LCD",
    weight: 220,
    optionTitle: "Lidhja",
    variants: [
      {
        title: "Me tel",
        sku: "VK-TH-W",
        price: 29,
        options: { Lidhja: "Me tel" },
      },
      {
        title: "Pa tel",
        sku: "VK-TH-RF",
        price: 49,
        options: { Lidhja: "Pa tel" },
      },
    ],
  },
  // ── Elektrike ──────────────────────────────────────────────────────────
  {
    title: "Kabllo NYM-J 3×2,5 mm²",
    handle: "kabllo-nym-3x25",
    description:
      "Kabllo instalimi me izolim PVC për instalime fikse. Shitet me metër ose me rrotull 100 m.",
    brand: "VOLTIK",
    category: "elektrike",
    subtitle: "Me metër ose rrotull 100 m",
    weight: 150,
    optionTitle: "Gjatësia",
    variants: [
      {
        title: "Me metër",
        sku: "VK-NYM325-M",
        price: 2,
        options: { Gjatësia: "Me metër" },
      },
      {
        title: "Rrotull 100 m",
        sku: "VK-NYM325-100",
        price: 165,
        options: { Gjatësia: "Rrotull 100 m" },
      },
    ],
  },
  {
    title: "Automat mbrojtës C16",
    handle: "automat-mbrojtes-c16",
    description:
      "Automat modular njëpolësh me kurbë C dhe kapacitet ndërprerjeje 6 kA.",
    brand: "VOLTIK",
    category: "elektrike",
    collection: "me-te-shiturat",
    subtitle: "1P · kurbë C · 6 kA",
    weight: 120,
    optionTitle: "Amperazhi",
    variants: [
      {
        title: "C10",
        sku: "VK-MCB-C10",
        price: 4,
        options: { Amperazhi: "C10" },
      },
      {
        title: "C16",
        sku: "VK-MCB-C16",
        price: 4,
        options: { Amperazhi: "C16" },
      },
      {
        title: "C25",
        sku: "VK-MCB-C25",
        price: 6,
        options: { Amperazhi: "C25" },
      },
    ],
  },
  {
    title: "Projektor LED 50 W",
    handle: "projektor-led-50w",
    description:
      "Projektor LED për jashtë me trup alumini dhe mbrojtje IP65, dritë e bardhë neutrale.",
    brand: "VOLTIK",
    category: "elektrike",
    collection: "ofertat-e-javes",
    subtitle: "IP65 · 4.000 K · 4.500 lm",
    weight: 850,
    optionTitle: "Fuqia",
    variants: [
      { title: "30 W", sku: "VK-FL30", price: 17, options: { Fuqia: "30 W" } },
      {
        title: "50 W",
        sku: "VK-FL50",
        price: 23,
        compareAt: 32,
        options: { Fuqia: "50 W" },
      },
      {
        title: "100 W",
        sku: "VK-FL100",
        price: 39,
        options: { Fuqia: "100 W" },
      },
    ],
  },
  // ── Vida & ankera ──────────────────────────────────────────────────────
  {
    title: "Vida druri 4×40 mm — kuti 500 copë",
    handle: "vida-druri-4x40",
    description:
      "Vida druri me kokë të zhytur dhe filetim të pjesshëm, të galvanizuara. Kuti 500 copë.",
    brand: "FIXPRO",
    category: "vida-ankera",
    collection: "me-te-shiturat",
    subtitle: "Kuti 500 copë · të galvanizuara",
    weight: 2100,
    optionTitle: "Masa",
    variants: [
      {
        title: "4×30 mm",
        sku: "FX-WS430",
        price: 8,
        options: { Masa: "4×30 mm" },
      },
      {
        title: "4×40 mm",
        sku: "FX-WS440",
        price: 9,
        options: { Masa: "4×40 mm" },
      },
      {
        title: "5×50 mm",
        sku: "FX-WS550",
        price: 12,
        options: { Masa: "5×50 mm" },
      },
    ],
  },
  {
    title: "Anker kimik 300 ml",
    handle: "anker-kimik-300ml",
    description:
      "Rrëshirë ankeruese me dy komponentë për beton të plasaritur, me dy përzierës në paketë.",
    brand: "FIXPRO",
    category: "vida-ankera",
    subtitle: "300 ml · 2 përzierës · beton",
    weight: 550,
    optionTitle: "Tipi",
    variants: [
      {
        title: "Poliester",
        sku: "FX-CA300-P",
        price: 11,
        options: { Tipi: "Poliester" },
      },
      {
        title: "Vinilester",
        sku: "FX-CA300-V",
        price: 18,
        options: { Tipi: "Vinilester" },
      },
    ],
  },
  {
    title: "Dybel najloni 8 mm — 100 copë",
    handle: "dybel-najloni-8mm",
    description:
      "Dybel najloni universal me jakë, për tulla, beton dhe blloqe.",
    brand: "FIXPRO",
    category: "vida-ankera",
    subtitle: "100 copë · universal",
    weight: 400,
    optionTitle: "Diametri",
    variants: [
      {
        title: "6 mm",
        sku: "FX-NP06",
        price: 3,
        options: { Diametri: "6 mm" },
      },
      {
        title: "8 mm",
        sku: "FX-NP08",
        price: 4,
        options: { Diametri: "8 mm" },
      },
      {
        title: "10 mm",
        sku: "FX-NP10",
        price: 6,
        options: { Diametri: "10 mm" },
      },
    ],
  },
  // ── Ndërtim & çimento ──────────────────────────────────────────────────
  {
    title: "Çimento portland 25 kg",
    handle: "cimento-portland-25kg",
    description:
      "Çimento portland CEM II 42,5 R për beton dhe llaç. Shitet me thes ose me paletë.",
    brand: "GURËZ",
    category: "ndertim-cimento",
    collection: "me-te-shiturat",
    subtitle: "CEM II 42,5 R · thes ose paletë",
    weight: 25000,
    optionTitle: "Paketimi",
    variants: [
      {
        title: "Thes 25 kg",
        sku: "GZ-CEM25",
        price: 5,
        options: { Paketimi: "Thes 25 kg" },
      },
      {
        title: "Paletë 54 thasë",
        sku: "GZ-CEM-PAL",
        price: 245,
        options: { Paketimi: "Paletë 54 thasë" },
      },
    ],
  },
  {
    title: "Llaç ngjitës për pllaka 25 kg",
    handle: "llac-ngjites-pllaka",
    description:
      "Llaç ngjitës çimentoje C1T për pllaka qeramike, i përshtatshëm për brenda dhe jashtë.",
    brand: "GURËZ",
    category: "ndertim-cimento",
    subtitle: "C1T · brenda dhe jashtë",
    weight: 25000,
    optionTitle: "Klasa",
    variants: [
      {
        title: "C1T standard",
        sku: "GZ-TA-C1T",
        price: 6,
        options: { Klasa: "C1T standard" },
      },
      {
        title: "C2TE fleksibël",
        sku: "GZ-TA-C2TE",
        price: 11,
        options: { Klasa: "C2TE fleksibël" },
      },
    ],
  },
  {
    title: "Rrjetë armimi 5×5 cm",
    handle: "rrjete-armimi-5x5",
    description:
      "Rrjetë çeliku e salduar për betonim dhe suvatim, fletë 2×1 m.",
    brand: "GURËZ",
    category: "ndertim-cimento",
    subtitle: "Fletë 2×1 m · e salduar",
    weight: 8500,
    optionTitle: "Trashësia",
    variants: [
      {
        title: "4 mm",
        sku: "GZ-MESH4",
        price: 9,
        options: { Trashësia: "4 mm" },
      },
      {
        title: "6 mm",
        sku: "GZ-MESH6",
        price: 16,
        options: { Trashësia: "6 mm" },
      },
    ],
  },
  // ── Bojë & izolim ──────────────────────────────────────────────────────
  {
    title: "Bojë muri e brendshme 15 l",
    handle: "boje-muri-15l",
    description:
      "Bojë akrilike mat për muret e brendshme, mbulim i lartë dhe ngjyrim në depo.",
    brand: "KROMA",
    category: "boje-izolim",
    collection: "ofertat-e-javes",
    subtitle: "Mat · ngjyrim në depo",
    weight: 19000,
    optionTitle: "Vëllimi",
    variants: [
      { title: "5 l", sku: "KR-IW05", price: 12, options: { Vëllimi: "5 l" } },
      {
        title: "15 l",
        sku: "KR-IW15",
        price: 29,
        compareAt: 38,
        options: { Vëllimi: "15 l" },
      },
    ],
  },
  {
    title: "Hidroizolues çimentoje 20 kg",
    handle: "hidroizolues-cimentoje",
    description:
      "Suvatim hidroizolues me dy komponentë për banja, tarraca dhe bodrume.",
    brand: "KROMA",
    category: "boje-izolim",
    subtitle: "2 komponentë · banja e tarraca",
    weight: 20000,
    optionTitle: "Paketimi",
    variants: [
      {
        title: "20 kg",
        sku: "KR-WP20",
        price: 34,
        options: { Paketimi: "20 kg" },
      },
    ],
  },
  {
    title: "Silikon sanitar 280 ml",
    handle: "silikon-sanitar-280ml",
    description:
      "Silikon acetik me mbrojtje kundër mykut për banja dhe kuzhina.",
    brand: "KROMA",
    category: "boje-izolim",
    subtitle: "Anti-myk · 280 ml",
    weight: 380,
    optionTitle: "Ngjyra",
    variants: [
      {
        title: "Transparent",
        sku: "KR-SIL-TR",
        price: 3,
        options: { Ngjyra: "Transparent" },
      },
      {
        title: "E bardhë",
        sku: "KR-SIL-WH",
        price: 3,
        options: { Ngjyra: "E bardhë" },
      },
    ],
  },
  // ── Mbrojtje në punë ───────────────────────────────────────────────────
  {
    title: "Doreza pune me veshje nitrili",
    handle: "doreza-pune-nitril",
    description:
      "Doreza pune me shpinë të ajrosur dhe pëllëmbë nitrili, kapje e sigurt në të lagësht.",
    brand: "SIGURIA",
    category: "mbrojtje-ne-pune",
    subtitle: "EN 388 · kapje në të lagësht",
    weight: 90,
    optionTitle: "Masa",
    variants: [
      {
        title: "9 / L",
        sku: "SG-GLV-09",
        price: 2,
        options: { Masa: "9 / L" },
      },
      {
        title: "10 / XL",
        sku: "SG-GLV-10",
        price: 2,
        options: { Masa: "10 / XL" },
      },
    ],
  },
  {
    title: "Helmetë pune me rrip mjekre",
    handle: "helmete-pune",
    description:
      "Helmetë ndërtimi me rregullim rrotullues dhe rrip mjekre me katër pika.",
    brand: "SIGURIA",
    category: "mbrojtje-ne-pune",
    subtitle: "EN 397 · rregullim rrotullues",
    weight: 420,
    optionTitle: "Ngjyra",
    variants: [
      {
        title: "E bardhë",
        sku: "SG-HLM-WH",
        price: 12,
        options: { Ngjyra: "E bardhë" },
      },
      {
        title: "E verdhë",
        sku: "SG-HLM-YL",
        price: 12,
        options: { Ngjyra: "E verdhë" },
      },
    ],
  },
  {
    title: "Këpucë pune S3 me majë çeliku",
    handle: "kepuce-pune-s3",
    description:
      "Këpucë sigurie S3 me majë çeliku, thembër antistatike dhe shollë kundër rrëshqitjes.",
    brand: "SIGURIA",
    category: "mbrojtje-ne-pune",
    collection: "ofertat-e-javes",
    subtitle: "S3 · majë çeliku · antistatike",
    weight: 1600,
    optionTitle: "Numri",
    variants: [
      { title: "42", sku: "SG-BT-42", price: 59, options: { Numri: "42" } },
      {
        title: "43",
        sku: "SG-BT-43",
        price: 59,
        compareAt: 79,
        options: { Numri: "43" },
      },
      { title: "44", sku: "SG-BT-44", price: 59, options: { Numri: "44" } },
    ],
  },
]
