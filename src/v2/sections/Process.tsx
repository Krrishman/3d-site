import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { PROCESS } from '../content'

/** Four steps in a row. A word and a line each. */
export function Process() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="process" className="relative px-5 py-24 md:px-10 md:py-36">
      <h2 data-reveal className="display mb-10 text-[clamp(2.6rem,7vw,6.5rem)] md:mb-14">{PROCESS.title}</h2>
      <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.steps.map((s, i) => (
          <li key={s.name} data-reveal className="border-t border-white/15 pt-5">
            <span className="accent text-3xl text-teal">0{i + 1}</span>
            <h3 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl">{s.name}</h3>
            <p className="mt-2 text-mist">{s.line}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
