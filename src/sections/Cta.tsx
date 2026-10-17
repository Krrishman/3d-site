import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { ACTION, BOOK_HREF } from '../content'

export function Cta() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, '[data-part]', 'lines')
  return (
    <section ref={root} className="relative flex min-h-[80svh] flex-col justify-between bg-navy px-4 pb-10 pt-24 text-paper md:min-h-[90svh] md:px-7 md:pb-10 md:pt-32">
      <h2 data-part className="max-w-[12ch] text-[12vw] leading-[0.9] md:text-s5">
        Your business, easier to run
      </h2>
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
        <p data-part className="text-s2 md:col-span-5">
          A free 15-minute workflow review. Tell me what is frustrating you, and we will see whether a better
          system can help. No pressure either way.
        </p>
        <a data-part href={BOOK_HREF} className="action action-blue bg-blue text-paper w-full md:col-span-3 md:col-start-10">{ACTION}</a>
      </div>
    </section>
  )
}
