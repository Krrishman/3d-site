import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { useReveal } from '../scroll/useReveal'
import { WORK } from '../content'

/** Six projects as large cards in a pinned sideways run on desktop; a vertical stack on phones. */
export function Work() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useReveal(root)
  useGSAP(
    () => {
      if (reduced || !root.current || !track.current) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth
        gsap.to(track.current, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + distance(), scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced] },
  )
  return (
    <section ref={root} id="work" className="work">
      <div className="work-head">
        <p className="meta" data-reveal>{WORK.index}</p>
        <h2 className="h-display" data-reveal>{WORK.heading[0]}<br /><span className="serif-i">{WORK.heading[1]}</span></h2>
        <p className="work-intro" data-reveal>{WORK.intro}</p>
      </div>
      <div ref={track} className="work-track">
        {WORK.items.map((w) => (
          <article key={w.n} className="card">
            <div className="card-pic" data-shutter>
              <img src={w.src} alt={w.name} width={1280} height={800} loading="lazy" />
            </div>
            <div className="card-body">
              <div className="card-row meta"><span>{w.n}</span><span>{w.kind}</span></div>
              <h3 className="card-title">{w.name}</h3>
              <p className="card-line">{w.line}</p>
              <p className="card-result">{w.result}</p>
            </div>
          </article>
        ))}
        <div className="work-end" aria-hidden="true" />
      </div>
    </section>
  )
}
