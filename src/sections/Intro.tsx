import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { Inbox } from '../ui/fragments'

export function Intro() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, '[data-tile]', 'settle')
  return (
    <section ref={root} className="bg-paper p-1.5 text-navy md:p-2">
      <div className="grid grid-cols-2 gap-1.5 md:grid-cols-12 md:grid-rows-[38svh_38svh] md:gap-2">
        <h2
          data-tile
          className="col-span-2 flex h-[46svh] items-end bg-navy p-5 text-[13vw] leading-[0.86] uppercase text-paper md:col-span-8 md:row-span-2 md:h-auto md:text-s5"
        >
          Stop losing<br />leads
        </h2>
        <p data-tile className="flex aspect-square items-end overflow-hidden bg-blue p-5 text-[13vw] leading-[0.86] font-extrabold tracking-tight text-paper md:col-span-4 md:aspect-auto md:text-s5">
          15&nbsp;min
        </p>
        <div data-tile className="aspect-square overflow-hidden bg-ui md:col-span-4 md:aspect-auto">
          <Inbox />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <p data-tile className="p-5 text-s2 leading-[1.35] md:col-span-6 md:col-start-7 md:p-10 md:text-s3">
          Your business should not run on missed calls, text-message threads and a spreadsheet nobody trusts.
          FlowForge Digital builds practical systems for local companies: every lead lands in one place, quotes go
          out faster and follow-ups happen on time, jobs, clients and documents stay organised, stock and supplies
          are counted before they run out, repetitive data entry disappears, and your customers get a better
          experience online. One developer builds it around the way your business already works, shows you progress
          as it comes together, and answers when you call. The free workflow review takes fifteen minutes.
        </p>
      </div>
    </section>
  )
}
