import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { SERVICES } from '../content'

/** Sticky title on the left; each service lights up as it passes the centre. */
export function Services() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 2)

  useGSAP(
    () => {
      if (!root.current) return
      const rows = gsap.utils.toArray<HTMLElement>('[data-service]', root.current)
      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 60%',
          end: 'bottom 40%',
          onToggle: (self) => row.classList.toggle('is-active', self.isActive),
        })
      })
      // Opacity is owned by the is-active class; the entrance only moves.
      if (!reduced) {
        gsap.from(rows, { y: 40, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
      }
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="services" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="eyebrow mb-4">Services</p>
            <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1]">{SERVICES.title}</h2>
            <div className="rule mt-8 w-40" />
          </div>
        </div>
        <ol className="md:col-span-7 md:col-start-6">
          {SERVICES.items.map((s) => (
            <li key={s.n} data-service className="group border-t border-white/10 py-10 transition-opacity duration-500 md:py-14 [&:not(.is-active)]:opacity-45 md:[&:not(.is-active)]:opacity-35">
              <div className="flex items-start gap-6">
                <span className="mt-2 text-sm font-bold text-teal">{s.n.padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[clamp(1.6rem,3vw,2.75rem)] leading-[1.05] transition-colors group-[.is-active]:text-teal">{s.name}</h3>
                  <p className="mt-4 max-w-[46ch] text-lg text-mist">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
