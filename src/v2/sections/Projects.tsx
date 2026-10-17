import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { PROJECTS } from '../content'

/** Cards stick as you scroll and the ones beneath scale down as the next arrives. */
export function Projects() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const total = PROJECTS.items.length

  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.utils.toArray<HTMLElement>('[data-card-wrap]', root.current).forEach((wrap, i) => {
        if (i === total - 1) return
        gsap.to(wrap.querySelector('[data-card]'), { scale: 1 - (total - 1 - i) * 0.04, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom top', scrub: true } })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="projects" className="relative px-4 pb-24 pt-10 md:px-8">
      <h2 className="display mb-10 px-1 text-[clamp(2.6rem,7vw,6.5rem)] md:mb-14 md:px-2">{PROJECTS.title}</h2>
      {PROJECTS.items.map((p, i) => (
        <div key={p.n} data-card-wrap className="h-[85vh]">
          <article data-card className="glass-solid sticky origin-top p-4 sm:p-6 md:p-8" style={{ top: `calc(6rem + ${i * 24}px)`, borderRadius: '2rem' }}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="accent text-4xl text-teal md:text-5xl">{p.n}</span>
                <div>
                  <div className="eyebrow">{p.category}</div>
                  <h3 className="mt-1 text-xl font-medium tracking-tight md:text-3xl">{p.name}</h3>
                </div>
              </div>
              <a href={p.href} className="btn btn-ghost min-h-11 px-6 text-sm">{p.cta}</a>
            </div>
            <div className="mt-5 grid grid-cols-[2fr_3fr] gap-3 sm:mt-6 sm:gap-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <img src={p.images[0]} alt="" loading="lazy" className="w-full rounded-2xl bg-navy object-cover md:rounded-3xl" style={{ height: 'clamp(110px, 14vw, 200px)' }} />
                <img src={p.images[1]} alt="" loading="lazy" className="w-full rounded-2xl bg-navy object-cover md:rounded-3xl" style={{ height: 'clamp(140px, 19vw, 300px)' }} />
              </div>
              <img src={p.images[2]} alt="" loading="lazy" className="h-full w-full rounded-2xl bg-navy object-cover md:rounded-3xl" style={{ minHeight: 'clamp(262px, 33vw, 516px)' }} />
            </div>
          </article>
        </div>
      ))}
    </section>
  )
}
