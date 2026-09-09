"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { formatEur } from "@lib/util/ustah-price"
import { buttonVariants } from "@modules/common/components/ustah"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconChevronLeft, IconChevronRight } from "@modules/common/icons"

export type HeroSlide = {
  /** Uppercase eyebrow on the accent block, e.g. "Java 37". */
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
  /** Optional price flag over the image: the headline offer for the slide. */
  offer?: {
    /** EUR, formatted through the shared money helper. */
    amount: number
    label: string
  } | null
  image?: string | null
  /** Alt text for the slide image; also the placeholder caption. */
  imageAlt: string
}

type Props = {
  slides: HeroSlide[]
}

/**
 * Homepage hero carousel.
 *
 * Scrolling is the source of truth, not an index: the track is a native
 * scroll-snap row, so a swipe on a phone and an arrow click on a desktop both
 * move the same thing and stay in sync. The dots and arrows only drive
 * `scrollTo` and read back from the scroll position, which is why there is no
 * autoplay timer to fight with a user mid-swipe.
 *
 * No autoplay is deliberate. The slides carry prices and CTAs, and a hero that
 * moves under a thumb costs a tap on the wrong offer.
 */
const HeroCarousel = ({ slides }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Read the active slide back from scroll position rather than tracking it on
  // click. A swipe, a keyboard scroll and an arrow press then all report the
  // same index, and an interrupted smooth-scroll cannot leave the dots lying.
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) {
      return
    }
    const index = Math.round(track.scrollLeft / track.clientWidth)
    setActive(Math.max(0, Math.min(slides.length - 1, index)))
  }, [slides.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }
    // `scrollend` is not in Safari yet, so this listens to `scroll` and lets
    // the rounding above settle it; the handler is cheap and passive.
    track.addEventListener("scroll", syncActive, { passive: true })
    return () => track.removeEventListener("scroll", syncActive)
  }, [syncActive])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) {
      return
    }
    const clamped = (index + slides.length) % slides.length
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" })
  }

  if (!slides.length) {
    return null
  }

  const single = slides.length === 1

  return (
    <section
      className="relative border-b border-divider"
      aria-roledescription="carousel"
      aria-label="Ofertat kryesore"
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory scrollbar-none overflow-x-auto"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className="grid w-full flex-none snap-start grid-cols-1 lg:grid-cols-[1fr_420px]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} nga ${slides.length}`}
            // A slide scrolled out of view is still in the DOM, so it stays
            // reachable by keyboard and screen reader without this.
            aria-hidden={index !== active}
          >
            <div className="relative grid h-[210px] place-items-center bg-surface lg:h-[400px]">
              {slide.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-mono text-[10px] text-muted lg:text-[11px]">
                  {slide.imageAlt}
                </span>
              )}

              <span className="absolute top-0 left-0 bg-accent px-3 py-2 text-[11px] font-bold tracking-[0.1em] text-white uppercase lg:px-5 lg:py-3 lg:text-[12px] lg:tracking-[0.12em]">
                {slide.eyebrow}
              </span>

              {slide.offer && (
                <div className="absolute right-5 bottom-5 bg-yellow px-4 py-3 text-right lg:right-auto lg:bottom-8 lg:left-8 lg:px-6 lg:py-4 lg:text-left">
                  <span className="block font-heading text-[30px] leading-[0.95] font-bold lg:text-[54px] lg:leading-[0.9]">
                    {formatEur(slide.offer.amount)}
                  </span>
                  <span className="text-[10px] leading-[1.2] lg:text-[12px]">
                    {slide.offer.label}
                  </span>
                </div>
              )}
            </div>

            {/* On desktop the copy sits on an accent panel with a yellow CTA;
                on mobile it drops below the image on white, where a yellow
                button would be the loudest thing on the page. */}
            <div className="flex flex-col justify-center bg-bg p-6 lg:bg-accent lg:p-10 lg:text-white">
              <h2 className="text-[29px] leading-[0.98] tracking-[0.01em] uppercase lg:text-[58px] lg:leading-[0.94]">
                {slide.title}
              </h2>
              <p className="mt-3 text-[14px] leading-[1.4] text-pretty text-muted-deep lg:mt-6 lg:text-[17px] lg:leading-[1.45] lg:text-white">
                {slide.body}
              </p>
              <LocalizedClientLink
                href={slide.ctaHref}
                className={buttonVariants({
                  variant: "accent",
                  size: "md",
                  className:
                    "mt-6 self-start lg:bg-yellow lg:text-text lg:hover:bg-yellow-600",
                })}
                // Only the visible slide's CTA is a tab stop; the others are
                // scrolled off-screen and would otherwise be silent focus traps.
                tabIndex={index === active ? undefined : -1}
              >
                {slide.ctaLabel}
              </LocalizedClientLink>
            </div>
          </div>
        ))}
      </div>

      {!single && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Slajdi i mëparshëm"
            className="absolute top-[83px] left-0 grid h-[44px] w-[40px] place-items-center bg-accent/90 text-white hover:bg-accent lg:top-[170px] lg:h-[60px] lg:w-[52px]"
          >
            <IconChevronLeft className="size-5 lg:size-[26px]" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Slajdi tjetër"
            className="absolute top-[83px] right-0 grid h-[44px] w-[40px] place-items-center bg-accent/90 text-white hover:bg-accent lg:top-[170px] lg:right-[432px] lg:h-[60px] lg:w-[52px]"
          >
            <IconChevronRight className="size-5 lg:size-[26px]" />
          </button>

          <div className="flex justify-center gap-[2px] pb-5 lg:absolute lg:top-[352px] lg:right-[432px] lg:gap-1 lg:pb-0">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Slajdi ${index + 1}`}
                aria-current={index === active}
                // The hit area is 44px tall for the thumb; the visible mark is
                // the 4px bar inside it.
                className="grid h-[44px] w-[34px] place-items-center lg:h-[26px] lg:w-[44px]"
              >
                <span
                  className={
                    index === active
                      ? "block h-[4px] w-6 bg-accent lg:h-[5px] lg:w-10"
                      : "block h-[4px] w-6 bg-border-strong lg:h-[5px] lg:w-10"
                  }
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HeroCarousel
