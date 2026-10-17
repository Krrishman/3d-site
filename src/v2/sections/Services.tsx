import { useRef } from 'react'
import { useReveal } from '../scroll/useReveal'
import { SERVICES } from '../content'

/** Four glass tiles. A name and one line each. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  return (
    <section ref={root} id="services" className="relative px-5 py-24 md:px-10 md:py-36">
      <h2 data-reveal className="display mb-10 text-[clamp(2.6rem,7vw,6.5rem)] md:mb-14">{SERVICES.title}</h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.items.map((s, i) => (
          <li key={s.name} data-reveal className="glass flex min-h-[180px] flex-col justify-between p-6 md:min-h-[280px] md:p-7">
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{s.name}</h3>
              <p className="mt-2 min-h-[3.1em] text-mist">{s.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
