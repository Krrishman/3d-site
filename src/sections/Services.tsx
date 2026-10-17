import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { SERVICES } from '../content'

export function Services() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 3)
  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.from('[data-title]', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
      gsap.utils.toArray<HTMLElement>('[data-item]', root.current).forEach((el, i) => {
        gsap.from(el, { opacity: 0, y: 30, duration: 0.7, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    },
    { scope: root, dependencies: [reduced] },
  )
  return (
    <section ref={root} id="services" className="relative z-10 rounded-t-[40px] bg-paper px-5 py-20 text-navy sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 data-title className="display mb-16 text-center text-[clamp(3rem,12vw,160px)] sm:mb-20 md:mb-28">{SERVICES.title}</h2>
      <ol className="mx-auto max-w-5xl">
        {SERVICES.items.map((s) => (
          <li key={s.n} data-item className="flex items-start gap-6 border-t border-navy/15 py-8 sm:gap-10 sm:py-10 md:py-12">
            <span className="display w-[1.3em] shrink-0 text-[clamp(3rem,10vw,140px)] leading-none">{s.n.padStart(2, '0')}</span>
            <div className="pt-2 md:pt-4">
              <h3 className="font-medium uppercase tracking-wide text-[clamp(1rem,2.2vw,2.1rem)]">{s.name}</h3>
              <p className="mt-3 max-w-2xl font-light leading-relaxed text-[clamp(0.95rem,1.6vw,1.25rem)] opacity-70">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
