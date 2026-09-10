import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="p-6">
      <h3 className="mb-2 font-heading text-card-title font-semibold uppercase">
        Të duhet ndihmë?
      </h3>
      <ul className="flex flex-col gap-y-1 text-small">
        <li>
          <LocalizedClientLink
            href="/contact"
            className="text-muted hover:text-text"
          >
            Na kontakto
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink
            href="/contact"
            className="text-muted hover:text-text"
          >
            Kthimet dhe ndërrimet
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  )
}

export default Help
