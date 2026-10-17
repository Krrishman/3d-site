import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { PROCESS } from '../content'

/** Pinned horizontal run of the four steps on desktop; a vertical list on phones. */
export function Process() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 7)

  useGSAP(
    () => {
      if (reduced || !root.current || !track.current) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + distance(), scrub: 0.5, pin: true, invalidateOnRefresh: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="process" className="relative overflow-hidden py-28 md:h-svh md:py-0">
      <div className="px-5 md:absolute md:left-10 md:top-24">
        <p className="eyebrow mb-4">Process</p>
        <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1]">How it <span className="accent text-teal">works</span></h2>
      </div>
      <div ref={track} className="mt-12 flex flex-col gap-4 px-5 md:mt-0 md:h-full md:flex-row md:items-end md:gap-6 md:px-10 md:pb-20 md:will-change-transform">
        {PROCESS.steps.map((s) => (
          <article key={s.n} className="panel shrink-0 p-7 md:w-[min(42vw,560px)] md:p-10">
            <div className="text-6xl font-extrabold leading-none text-teal/90 md:text-8xl">{s.n}</div>
            <h3 className="mt-6 text-2xl font-normal md:text-3xl">{s.name}</h3>
            <p className="mt-3 text-lg text-mist">{s.body}</p>
          </article>
        ))}
        <div className="hidden shrink-0 md:block md:w-[20vw]" />
      </div>
    </section>
  )
}
