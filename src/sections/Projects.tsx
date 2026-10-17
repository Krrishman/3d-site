import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { PROJECTS } from '../content'

/** Cards stick as you scroll and the ones beneath scale down as the next arrives. */
export function Projects() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 4)
  const total = PROJECTS.items.length

  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.from('[data-title]', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
      gsap.utils.toArray<HTMLElement>('[data-card-wrap]', root.current).forEach((wrap, i) => {
        const card = wrap.querySelector('[data-card]')
        const targetScale = 1 - (total - 1 - i) * 0.03
        if (i === total - 1) return
        gsap.to(card, { scale: targetScale, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom top', scrub: true } })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-navy px-4 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 md:-mt-14 md:rounded-t-[60px] md:px-8 md:pt-28">
      <h2 data-title className="display display-gradient mb-10 text-center text-[clamp(3rem,12vw,160px)] md:mb-16">{PROJECTS.title}</h2>
      {PROJECTS.items.map((p, i) => (
        <div key={p.n} data-card-wrap className="h-[85vh]">
          <article
            data-card
            className="sticky top-24 origin-top rounded-[40px] border-2 border-mist bg-navy p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
            style={{ top: `calc(6rem + ${i * 28}px)` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="display display-gradient text-[clamp(2.5rem,8vw,110px)] leading-none">{p.n}</span>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-mist sm:text-sm">{p.category}</div>
                  <h3 className="mt-1 font-medium uppercase tracking-wide text-[clamp(1.1rem,2.2vw,2rem)]">{p.name}</h3>
                </div>
              </div>
              <a href={p.href} className="btn btn-outline min-h-11 px-6 text-xs sm:px-8 sm:text-sm">{p.cta}</a>
            </div>
            <div className="mt-5 grid grid-cols-[2fr_3fr] gap-3 sm:mt-6 sm:gap-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <img src={p.images[0]} alt="" loading="lazy" className="w-full rounded-[28px] bg-navy-2 object-cover sm:rounded-[40px] md:rounded-[50px]" style={{ height: 'clamp(110px, 14vw, 200px)' }} />
                <img src={p.images[1]} alt="" loading="lazy" className="w-full rounded-[28px] bg-navy-2 object-cover sm:rounded-[40px] md:rounded-[50px]" style={{ height: 'clamp(140px, 19vw, 300px)' }} />
              </div>
              <img src={p.images[2]} alt="" loading="lazy" className="h-full w-full rounded-[28px] bg-navy-2 object-cover sm:rounded-[40px] md:rounded-[50px]" style={{ minHeight: 'clamp(262px, 33vw, 516px)' }} />
            </div>
          </article>
        </div>
      ))}
    </section>
  )
}
