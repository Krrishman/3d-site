import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '../scroll/gsap'
import { useReducedMotion } from '../scroll/useReducedMotion'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const split = SplitText.create('[data-split]', {
        type: 'lines',
        linesClass: 'split-line',
        mask: 'lines',
      })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.2,
      })
      gsap.from('[data-fade]', { opacity: 0, y: 16, duration: 0.8, delay: 0.9, ease: 'power2.out' })
      return () => split.revert()
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} className="flex min-h-svh flex-col justify-end px-6 pb-16 md:px-16">
      <h1
        data-split
        className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight md:text-8xl"
      >
        A site that moves the way it should.
      </h1>
      <p data-fade className="mt-8 max-w-md text-base text-paper/70 md:text-lg">
        Placeholder copy. Scroll to drive the scene.
      </p>
    </section>
  )
}
