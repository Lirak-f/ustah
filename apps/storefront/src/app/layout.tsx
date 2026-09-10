import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  icons: {
    icon: "/ustah-ikona-128-blu.png",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  // Albanian is the primary language; English is a later addition rather than
  // the default. `lang` drives hyphenation and screen-reader pronunciation, so
  // it must not stay "en" while the entire UI is Albanian.
  return (
    <html lang="sq" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
