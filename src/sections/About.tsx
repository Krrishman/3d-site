import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../scroll/gsap'
import { useStage } from '../scroll/useStage'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { ABOUT, BOOK_HREF, HERO } from '../content'

export function About() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useStage(root, 6)
  useGSAP(
    () => {
      if (reduced || !root.current) return
      gsap.from('[data-title]', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
      const split = SplitText.create('[data-chars]', { type: 'chars,words' })
      gsap.fromTo(split.chars, { opacity: 0.2 }, {
        opacity: 1, ease: 'none', stagger: 0.02,
        scrollTrigger: { trigger: '[data-chars]', start: 'top 80%', end: 'bottom 20%', scrub: true },
      })
      return () => split.revert()
    },
    { scope: root, dependencies: [reduced] },
  )
  return (
    <section ref={root} id="about" className="relative flex min-h-svh flex-col items-center justify-center gap-10 px-5 py-20 text-center sm:gap-14 sm:px-8 md:gap-16 md:px-10">
      <h2 data-title className="display display-gradient text-[clamp(3rem,12vw,160px)]">{ABOUT.title}</h2>
      <p data-chars className="max-w-[560px] font-medium leading-relaxed text-mist text-[clamp(1rem,2vw,1.35rem)]">{ABOUT.text}</p>
      <a href={BOOK_HREF} className="btn btn-gradient mt-6 min-h-12 px-10 text-xs sm:text-sm md:min-h-14 md:px-12 md:text-base">{HERO.primary}</a>
    </section>
  )
}
