import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { BOOK_HREF, CTA, EMAIL, SITE } from '../content'
import { FlowMark } from '../ui/FlowMark'

export function Cta() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} className="relative flex min-h-svh flex-col justify-between px-5 pt-32 pb-8 md:px-10">
      <div>
        <h2 data-reveal className="max-w-[14ch] text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.96]">
          {CTA.line1} <span className="accent text-teal glow-teal">{CTA.accent}</span>
        </h2>
        <p data-reveal className="mt-8 max-w-[30rem] text-lg text-mist md:text-xl">{CTA.body}</p>
        <a data-reveal href={BOOK_HREF} className="btn btn-primary mt-10 min-h-14 px-8 text-lg">{CTA.button}</a>
      </div>
      <footer className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-mist md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 font-bold text-paper"><FlowMark className="h-5 w-5 text-teal" />FlowForge Digital</div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a className="hover:text-paper" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{SITE}</span>
        </div>
      </footer>
    </section>
  )
}
