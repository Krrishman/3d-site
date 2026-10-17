import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'
import { ABOUT } from '../content'

export function About() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced || !root.current) return
      const split = SplitText.create('[data-words]', { type: 'words' })
      gsap.fromTo(split.words, { opacity: 0.15 }, { opacity: 1, ease: 'none', stagger: 0.04, scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 40%', scrub: true } })
      return () => split.revert()
    },
    { scope: root, dependencies: [reduced] },
  )
  return (
    <section ref={root} id="about" className="relative flex min-h-[80svh] flex-col items-center justify-center px-5 py-24 text-center md:px-10">
      <p className="eyebrow mb-8">{ABOUT.title}</p>
      <p data-words className="max-w-[22ch] text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.1] tracking-tight">{ABOUT.text}</p>
    </section>
  )
}
